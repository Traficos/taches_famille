import { SQLiteDatabase } from 'expo-sqlite';

export interface Task {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  assigned_to: number | null;
  recurrence: 'once' | 'daily' | 'weekly' | 'custom';
  recurrence_days: string | null;
  active: number;
}

export interface TaskCompletion {
  id: number;
  task_id: number;
  profile_id: number;
  completed_at: string;
}

interface CreateTaskInput {
  name: string;
  description?: string;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  assignedTo: number | null;
  recurrence: 'once' | 'daily' | 'weekly' | 'custom';
  recurrenceDays: string | null;
}

export async function createTask(db: SQLiteDatabase, input: CreateTaskInput): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO tasks (name, description, icon, points, type, assigned_to, recurrence, recurrence_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    input.name, input.description ?? null, input.icon, input.points, input.type, input.assignedTo, input.recurrence, input.recurrenceDays,
  );
  return result.lastInsertRowId;
}

export async function getTasksForChild(db: SQLiteDatabase, childId: number): Promise<Task[]> {
  return db.getAllAsync<Task>(
    'SELECT * FROM tasks WHERE active = 1 AND ((type = ? AND assigned_to = ?) OR (type = ? AND assigned_to = ?)) ORDER BY name',
    'assigned', childId, 'free', childId,
  );
}

export async function getFreeTasks(db: SQLiteDatabase): Promise<Task[]> {
  return db.getAllAsync<Task>(
    'SELECT * FROM tasks WHERE active = 1 AND type = ? AND assigned_to IS NULL ORDER BY name',
    'free',
  );
}

export async function getAllTasks(db: SQLiteDatabase): Promise<Task[]> {
  return db.getAllAsync<Task>('SELECT * FROM tasks WHERE active = 1 ORDER BY name');
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export async function completeTask(
  db: SQLiteDatabase,
  taskId: number,
  profileId: number,
): Promise<void> {
  const now = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO task_completions (task_id, profile_id, completed_at) VALUES (?, ?, ?)',
    taskId, profileId, now,
  );
}

export async function isTaskCompletedToday(
  db: SQLiteDatabase,
  taskId: number,
  profileId: number,
): Promise<boolean> {
  const today = getTodayDateString();
  const row = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM task_completions WHERE task_id = ? AND profile_id = ? AND completed_at >= ? || 'T00:00:00'",
    taskId, profileId, today,
  );
  return (row?.count ?? 0) > 0;
}

export async function getCompletionsForDate(
  db: SQLiteDatabase,
  profileId: number,
  date: string,
): Promise<TaskCompletion[]> {
  return db.getAllAsync<TaskCompletion>(
    "SELECT * FROM task_completions WHERE profile_id = ? AND completed_at >= ? || 'T00:00:00' AND completed_at < ? || 'T23:59:59' ORDER BY completed_at DESC",
    profileId, date, date,
  );
}

export async function claimFreeTask(
  db: SQLiteDatabase,
  taskId: number,
  childId: number,
): Promise<void> {
  await db.runAsync(
    'UPDATE tasks SET assigned_to = ? WHERE id = ? AND type = ? AND assigned_to IS NULL',
    childId, taskId, 'free',
  );
}

export async function cancelCompletion(
  db: SQLiteDatabase,
  completionId: number,
  profileId: number,
  points: number,
): Promise<void> {
  await db.runAsync('DELETE FROM task_completions WHERE id = ?', completionId);
  await db.runAsync(
    'UPDATE profiles SET total_points = MAX(0, total_points - ?), current_points = MAX(0, current_points - ?) WHERE id = ?',
    points, points, profileId,
  );
}

export async function updateTask(db: SQLiteDatabase, id: number, input: CreateTaskInput): Promise<void> {
  await db.runAsync(
    'UPDATE tasks SET name = ?, icon = ?, points = ?, type = ?, assigned_to = ?, recurrence = ?, recurrence_days = ? WHERE id = ?',
    input.name, input.icon, input.points, input.type, input.assignedTo, input.recurrence, input.recurrenceDays, id,
  );
}

export async function deleteTask(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('UPDATE tasks SET active = 0 WHERE id = ?', id);
}

export function isTaskScheduledToday(task: Task): boolean {
  if (task.recurrence === 'daily') return true;
  if (task.recurrence === 'once') return true;
  if (task.recurrence === 'weekly') return true;
  if (task.recurrence === 'custom' && task.recurrence_days) {
    const today = new Date().getDay(); // 0=dimanche, 1=lundi... 6=samedi
    const days = task.recurrence_days.split(',').map(Number);
    return days.includes(today);
  }
  return false;
}
