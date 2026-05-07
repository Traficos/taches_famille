import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { getDatabase } from '../db/database';
import { Family } from '../types';

export async function accountRoutes(app: FastifyInstance) {
  // GET /account/me — implémenté en Task 2
  app.get('/me', async (request, reply) => {
    const familyId = (request as any).familyId;
    const db = getDatabase();
    const family = db.prepare(
      'SELECT email, created_at FROM families WHERE id = ?'
    ).get(familyId) as { email: string; created_at: string } | undefined;
    if (!family) {
      return reply.status(404).send({ error: 'Famille introuvable' });
    }
    return { email: family.email, createdAt: family.created_at };
  });
  // POST /account/change-password — implémenté en Task 3
  // DELETE /account — implémenté en Task 4
}
