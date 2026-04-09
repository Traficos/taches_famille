import { FastifyInstance } from 'fastify';
import { getDatabase } from '../db/database';

export async function penaltyRoutes(app: FastifyInstance) {
  app.get('/:profileId', async (request) => {
    const { profileId } = request.params as { profileId: string };
    const db = getDatabase();
    return db.prepare(
      'SELECT * FROM penalties WHERE profile_id = ? ORDER BY created_at DESC'
    ).all(profileId);
  });

  app.get('/:profileId/count', async (request) => {
    const { profileId } = request.params as { profileId: string };
    const db = getDatabase();
    const row = db.prepare(
      'SELECT COUNT(*) as count FROM penalties WHERE profile_id = ?'
    ).get(profileId) as { count: number };
    return { count: row.count };
  });

  app.post('/', async (request, reply) => {
    const { profileId, points, reason } = request.body as {
      profileId: number; points: number; reason: string;
    };
    const now = new Date().toISOString();
    const db = getDatabase();
    const result = db.prepare(
      'INSERT INTO penalties (profile_id, points, reason, created_at) VALUES (?, ?, ?, ?)'
    ).run(profileId, points, reason, now);
    return reply.status(201).send({ id: result.lastInsertRowid });
  });

  app.delete('/:id', async (request) => {
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare('DELETE FROM penalties WHERE id = ?').run(id);
    return { success: true };
  });
}
