import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { getDatabase } from '../db/database';
import { createToken } from '../middleware/auth';
import { Family } from '../types';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    if (!email || !password || password.length < 6) {
      return reply.status(400).send({ error: 'Email et mot de passe (6+ caracteres) requis' });
    }
    const db = getDatabase();
    const existing = db.prepare('SELECT id FROM families WHERE email = ?').get(email);
    if (existing) {
      return reply.status(409).send({ error: 'Cet email est deja utilise' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    const result = db.prepare(
      'INSERT INTO families (email, password_hash, created_at) VALUES (?, ?, ?)'
    ).run(email, passwordHash, now);
    const familyId = result.lastInsertRowid as number;
    const token = createToken(familyId);
    return reply.status(201).send({ token, familyId });
  });

  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    if (!email || !password) {
      return reply.status(400).send({ error: 'Email et mot de passe requis' });
    }
    const db = getDatabase();
    const family = db.prepare('SELECT * FROM families WHERE email = ?').get(email) as Family | undefined;
    if (!family) {
      return reply.status(401).send({ error: 'Identifiants invalides' });
    }
    const valid = await bcrypt.compare(password, family.password_hash);
    if (!valid) {
      return reply.status(401).send({ error: 'Identifiants invalides' });
    }
    const token = createToken(family.id);
    return reply.status(200).send({ token, familyId: family.id });
  });
}
