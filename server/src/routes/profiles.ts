import { FastifyInstance } from 'fastify';
import { getDatabase } from '../db/database';

export async function profileRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    return db.prepare(
      'SELECT * FROM profiles WHERE family_id = ? ORDER BY type DESC, name ASC'
    ).all(familyId);
  });

  app.post('/', async (request, reply) => {
    const familyId = (request as any).familyId;
    const { name, type, pin, animalType, animalName } = request.body as {
      name: string; type: 'parent' | 'child'; pin?: string;
      animalType?: string; animalName?: string;
    };
    const db = getDatabase();
    if (type === 'parent') {
      const result = db.prepare(
        'INSERT INTO profiles (family_id, name, type, pin) VALUES (?, ?, ?, ?)'
      ).run(familyId, name, 'parent', pin ?? null);
      return reply.status(201).send({ id: result.lastInsertRowid });
    }
    const result = db.prepare(
      'INSERT INTO profiles (family_id, name, type, animal_type, animal_name) VALUES (?, ?, ?, ?, ?)'
    ).run(familyId, name, 'child', animalType ?? null, animalName ?? null);
    return reply.status(201).send({ id: result.lastInsertRowid });
  });

  app.put('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { name, animalType, animalName } = request.body as {
      name: string; animalType?: string; animalName?: string;
    };
    const db = getDatabase();
    db.prepare(
      'UPDATE profiles SET name = ?, animal_type = ?, animal_name = ? WHERE id = ? AND family_id = ?'
    ).run(name, animalType ?? null, animalName ?? null, id, familyId);
    return { success: true };
  });

  app.delete('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const db = getDatabase();
    db.prepare('DELETE FROM profiles WHERE id = ? AND family_id = ?').run(id, familyId);
    return { success: true };
  });

  app.get('/:id', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const db = getDatabase();
    return db.prepare(
      'SELECT * FROM profiles WHERE id = ? AND family_id = ?'
    ).get(id, familyId);
  });

  app.post('/:id/verify-pin', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { pin } = request.body as { pin: string };
    const db = getDatabase();
    const profile = db.prepare(
      'SELECT pin FROM profiles WHERE id = ? AND family_id = ?'
    ).get(id, familyId) as { pin: string | null } | undefined;
    return { valid: profile?.pin === pin };
  });

  app.put('/:id/points', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { delta } = request.body as { delta: number };
    const db = getDatabase();
    if (delta > 0) {
      db.prepare(
        'UPDATE profiles SET total_points = total_points + ?, current_points = current_points + ? WHERE id = ? AND family_id = ?'
      ).run(delta, delta, id, familyId);
    } else {
      db.prepare(
        'UPDATE profiles SET current_points = MAX(0, current_points + ?) WHERE id = ? AND family_id = ?'
      ).run(delta, id, familyId);
    }
    return db.prepare('SELECT * FROM profiles WHERE id = ? AND family_id = ?').get(id, familyId);
  });

  app.put('/:id/stage', async (request) => {
    const familyId = (request as any).familyId;
    const { id } = request.params as { id: string };
    const { stage } = request.body as { stage: string };
    const db = getDatabase();
    db.prepare(
      'UPDATE profiles SET animal_stage = ? WHERE id = ? AND family_id = ?'
    ).run(stage, id, familyId);
    return { success: true };
  });
}
