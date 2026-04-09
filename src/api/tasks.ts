import { apiFetch } from './client';

export interface Task {
  id: number;
  family_id: number;
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

export async function createTask(input: CreateTaskInput): Promise<number> {
  const res = await apiFetch<{ id: number }>('/tasks', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.id;
}

export async function getAllTasks(): Promise<Task[]> {
  return apiFetch<Task[]>('/tasks');
}

export async function getTasksForChild(childId: number): Promise<Task[]> {
  return apiFetch<Task[]>(`/tasks/for-child/${childId}`);
}

export async function getFreeTasks(): Promise<Task[]> {
  return apiFetch<Task[]>('/tasks/free');
}

export async function completeTask(taskId: number, profileId: number): Promise<void> {
  await apiFetch(`/tasks/${taskId}/complete`, {
    method: 'POST',
    body: JSON.stringify({ profileId }),
  });
}

export async function isTaskCompletedToday(taskId: number, profileId: number): Promise<boolean> {
  const res = await apiFetch<{ completed: boolean }>(`/tasks/${taskId}/completed-today?profileId=${profileId}`);
  return res.completed;
}

export async function claimFreeTask(taskId: number, childId: number): Promise<void> {
  await apiFetch(`/tasks/${taskId}/claim`, {
    method: 'POST',
    body: JSON.stringify({ childId }),
  });
}

export async function updateTask(id: number, input: CreateTaskInput): Promise<void> {
  await apiFetch(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await apiFetch(`/tasks/${id}`, { method: 'DELETE' });
}

export async function cancelCompletion(completionId: number, profileId: number, points: number): Promise<void> {
  await apiFetch(`/tasks/0/completions/${completionId}`, { method: 'DELETE' });
  await apiFetch(`/profiles/${profileId}/points`, {
    method: 'PUT',
    body: JSON.stringify({ delta: -points }),
  });
}

export async function getCompletionsForDate(profileId: number, date: string): Promise<TaskCompletion[]> {
  return apiFetch<TaskCompletion[]>(`/tasks/completions/${profileId}?date=${date}`);
}

export function isTaskScheduledToday(task: Task): boolean {
  if (task.recurrence === 'daily') return true;
  if (task.recurrence === 'once') return true;
  if (task.recurrence === 'weekly') return true;
  if (task.recurrence === 'custom' && task.recurrence_days) {
    const today = new Date().getDay();
    const days = task.recurrence_days.split(',').map(Number);
    return days.includes(today);
  }
  return false;
}
