import { FastifyInstance } from 'fastify';
import { getDatabase } from '../db/database';

export async function penaltyRoutes(app: FastifyInstance) {
  app.get('/:profileId', async (request) => {
    const familyId = (request as any).familyId;
    const { profileId } = request.params as { profileId: string };
    const db = getDatabase();
    // Verify profile belongs to this family
    const profile = db.prepare('SELECT id FROM profiles WHERE id = ? AND family_id = ?').get(profileId, familyId);
    if (!profile) return [];
    return db.prepare(
      'SELECT * FROM penalties WHERE profile_id = ? ORDER BY created_at DESC'
    ).all(profileId);
  });

  app.get('/:profileId/count', async (request) => {
    const familyId = (request as any).familyId;
    const { profileId } = request.params as { profileId: string };
    const db = getDatabase();
    // Verify profile belongs to this family
    const profile = db.prepare('SELECT id FROM profiles WHERE id = ? AND family_id = ?').get(profileId, familyId);
    if (!profile) return { count: 0 };
    const row = db.prepare(
      'SELECT COUNT(*) as count FROM penalties WHERE profile_id = ?'
    ).get(profileId) as { count: number };
    return { count: row.count };
  });

  app.post('/', async (request, reply) => {
    const familyId = (request as any).familyId;
    const { profileId, points, reason } = request.body as {
      profileId: number; points: number; reason: string;
    };
    const db = getDatabase();
    // Verify profile belongs to this family
    const profile = db.prepare('SELECT id FROM profiles WHERE id = ? AND family_id = ?').get(profileId, familyId);
    if (!profile) return reply.status(403).send({ error: 'Profil non trouve' });
    const now = new Date().toISOString();
    const result = db.prepare(
      'INSERT INTO penalties (profile_id, points, reason, created_at) VALUES (?, ?, ?, ?)'
    ).run(profileId, points, reason, now);
    return reply.status(201).send({ id: result.lastInsertRowid });
  });

  app.delete('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare(
      'DELETE FROM penalties WHERE id = ? AND profile_id IN (SELECT id FROM profiles WHERE family_id = ?)'
    ).run(id, familyId);
    return { success: true };
  });
}
