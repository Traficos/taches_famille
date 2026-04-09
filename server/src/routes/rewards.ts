import { FastifyInstance } from 'fastify';
import { getDatabase } from '../db/database';

export async function rewardRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      'SELECT * FROM rewards WHERE family_id = ? ORDER BY type, cost ASC'
    ).all(familyId);
  });

  app.get('/real', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      "SELECT * FROM rewards WHERE family_id = ? AND type = 'real' ORDER BY cost ASC"
    ).all(familyId);
  });

  app.get('/accessories', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      "SELECT * FROM rewards WHERE family_id = ? AND type = 'accessory' ORDER BY cost ASC"
    ).all(familyId);
  });

  app.post('/', async (request, reply) => {
    const familyId = (request as any).familyId;
    const { name, cost, type, accessoryKey } = request.body as {
      name: string; cost: number; type: 'real' | 'accessory'; accessoryKey?: string;
    };
    const db = getDatabase();
    const result = db.prepare(
      'INSERT INTO rewards (family_id, name, cost, type, accessory_key) VALUES (?, ?, ?, ?, ?)'
    ).run(familyId, name, cost, type, accessoryKey ?? null);
    return reply.status(201).send({ id: result.lastInsertRowid });
  });

  app.delete('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare('DELETE FROM rewards WHERE id = ? AND family_id = ?').run(id, familyId);
    return { success: true };
  });

  app.post('/:id/purchase', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { profileId } = request.body as { profileId: number };
    const db = getDatabase();
    const reward = db.prepare('SELECT * FROM rewards WHERE id = ? AND family_id = ?').get(id, familyId);
    if (!reward) return { error: 'Recompense non trouvee' };
    const now = new Date().toISOString();
    const result = db.prepare(
      'INSERT INTO purchased_rewards (reward_id, profile_id, purchased_at) VALUES (?, ?, ?)'
    ).run(id, profileId, now);
    return { purchaseId: result.lastInsertRowid };
  });

  app.get('/vouchers/:childId', async (request) => {
    const familyId = (request as any).familyId;
    const { childId } = request.params as { childId: string };
    const db = getDatabase();
    return db.prepare(
      `SELECT pr.*, r.name as reward_name, r.cost as reward_cost
       FROM purchased_rewards pr
       JOIN rewards r ON r.id = pr.reward_id
       WHERE pr.profile_id = ? AND r.family_id = ? AND r.type = 'real'
       ORDER BY pr.purchased_at DESC`
    ).all(childId, familyId);
  });

  app.get('/accessories-owned/:childId', async (request) => {
    const familyId = (request as any).familyId;
    const { childId } = request.params as { childId: string };
    const db = getDatabase();
    const rows = db.prepare(
      `SELECT r.accessory_key FROM purchased_rewards pr
       JOIN rewards r ON r.id = pr.reward_id
       WHERE pr.profile_id = ? AND r.family_id = ? AND r.type = 'accessory'`
    ).all(childId, familyId) as { accessory_key: string }[];
    return rows.map(r => r.accessory_key);
  });

  app.put('/vouchers/:id/use', async (request) => {
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare('UPDATE purchased_rewards SET used = 1 WHERE id = ?').run(id);
    return { success: true };
  });
}
