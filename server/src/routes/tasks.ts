import { FastifyInstance } from 'fastify';
import { getDatabase } from '../db/database';

export async function taskRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      'SELECT * FROM tasks WHERE family_id = ? AND active = 1 ORDER BY name'
    ).all(familyId);
  });

  app.get('/for-child/:childId', async (request) => {
    const familyId = (request as any).familyId;
    const { childId } = request.params as { childId: string };
    const db = getDatabase();
    return db.prepare(
      `SELECT * FROM tasks WHERE family_id = ? AND active = 1
       AND ((type = 'assigned' AND assigned_to = ?) OR (type = 'free' AND assigned_to = ?))
       ORDER BY name`
    ).all(familyId, childId, childId);
  });

  app.get('/free', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      "SELECT * FROM tasks WHERE family_id = ? AND active = 1 AND type = 'free' AND assigned_to IS NULL ORDER BY name"
    ).all(familyId);
  });

  app.post('/', async (request, reply) => {
    const familyId = (request as any).familyId;
    const { name, description, icon, points, type, assignedTo, recurrence, recurrenceDays } = request.body as {
      name: string; description?: string; icon: string; points: number;
      type: 'assigned' | 'free'; assignedTo: number | null;
      recurrence: 'once' | 'daily' | 'weekly' | 'custom'; recurrenceDays: string | null;
    };
    const db = getDatabase();
    const result = db.prepare(
      'INSERT INTO tasks (family_id, name, description, icon, points, type, assigned_to, recurrence, recurrence_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(familyId, name, description ?? null, icon, points, type, assignedTo, recurrence, recurrenceDays);
    return reply.status(201).send({ id: result.lastInsertRowid });
  });

  app.put('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { name, icon, points, type, assignedTo, recurrence, recurrenceDays } = request.body as {
      name: string; icon: string; points: number;
      type: 'assigned' | 'free'; assignedTo: number | null;
      recurrence: 'once' | 'daily' | 'weekly' | 'custom'; recurrenceDays: string | null;
    };
    const db = getDatabase();
    db.prepare(
      'UPDATE tasks SET name = ?, icon = ?, points = ?, type = ?, assigned_to = ?, recurrence = ?, recurrence_days = ? WHERE id = ? AND family_id = ?'
    ).run(name, icon, points, type, assignedTo, recurrence, recurrenceDays, id, familyId);
    return { success: true };
  });

  app.delete('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare('UPDATE tasks SET active = 0 WHERE id = ? AND family_id = ?').run(id, familyId);
    return { success: true };
  });

  app.post('/:id/complete', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { profileId } = request.body as { profileId: number };
    const db = getDatabase();
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND family_id = ?').get(id, familyId) as any;
    if (!task) return { error: 'Tache non trouvee' };
    const now = new Date().toISOString();
    const result = db.prepare(
      'INSERT INTO task_completions (task_id, profile_id, completed_at) VALUES (?, ?, ?)'
    ).run(id, profileId, now);
    return { completionId: result.lastInsertRowid };
  });

  app.get('/:id/completed-today', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { profileId } = request.query as { profileId: string };
    const db = getDatabase();
    const today = new Date().toISOString().split('T')[0];
    const row = db.prepare(
      "SELECT COUNT(*) as count FROM task_completions WHERE task_id = ? AND profile_id = ? AND completed_at >= ? || 'T00:00:00'"
    ).get(id, profileId, today) as { count: number };
    return { completed: row.count > 0 };
  });

  app.post('/:id/claim', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { childId } = request.body as { childId: number };
    const db = getDatabase();
    db.prepare(
      "UPDATE tasks SET assigned_to = ? WHERE id = ? AND family_id = ? AND type = 'free' AND assigned_to IS NULL"
    ).run(childId, id, familyId);
    return { success: true };
  });

  app.delete('/:id/completions/:completionId', async (request) => {
    const { completionId } = request.params as { id: string; completionId: string };
    const db = getDatabase();
    db.prepare('DELETE FROM task_completions WHERE id = ?').run(completionId);
    return { success: true };
  });

  app.get('/completions/history/:profileId', async (request) => {
    const { profileId } = request.params as { profileId: string };
    const db = getDatabase();
    return db.prepare(
      "SELECT tc.*, t.name as task_name, t.points as task_points, t.icon as task_icon FROM task_completions tc JOIN tasks t ON t.id = tc.task_id WHERE tc.profile_id = ? ORDER BY tc.completed_at DESC LIMIT 100"
    ).all(profileId);
  });

  app.get('/completions/:profileId', async (request) => {
    const { profileId } = request.params as { profileId: string };
    const { date } = request.query as { date: string };
    const db = getDatabase();
    return db.prepare(
      "SELECT tc.*, t.name as task_name, t.points as task_points, t.icon as task_icon FROM task_completions tc JOIN tasks t ON t.id = tc.task_id WHERE tc.profile_id = ? AND tc.completed_at >= ? || 'T00:00:00' AND tc.completed_at <= ? || 'T23:59:59' ORDER BY tc.completed_at DESC"
    ).all(profileId, date, date);
  });
}
