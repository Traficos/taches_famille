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
  app.post('/change-password', async (request, reply) => {
    const familyId = (request as any).familyId;
    const { currentPassword, newPassword } = request.body as {
      currentPassword?: string;
      newPassword?: string;
    };
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return reply.status(400).send({
        error: 'currentPassword requis et newPassword (6+ caracteres) requis',
      });
    }
    const db = getDatabase();
    const family = db.prepare('SELECT * FROM families WHERE id = ?').get(familyId) as Family | undefined;
    if (!family) {
      return reply.status(404).send({ error: 'Famille introuvable' });
    }
    const valid = await bcrypt.compare(currentPassword, family.password_hash);
    if (!valid) {
      return reply.status(401).send({ error: 'Mot de passe actuel incorrect' });
    }
    const newHash = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE families SET password_hash = ? WHERE id = ?').run(newHash, familyId);
    return { ok: true };
  });
  // DELETE /account — implémenté en Task 4
}
