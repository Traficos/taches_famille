process.env.NODE_ENV = 'test';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { initDatabase, closeDatabase, getDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';
import { accountRoutes } from '../../src/routes/account';
import { authGuard } from '../../src/middleware/auth';

let app: ReturnType<typeof Fastify>;
let token: string;

beforeEach(async () => {
  closeDatabase();
  await initDatabase(':memory:');
  app = Fastify();
  await app.register(cors);
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(async (instance: FastifyInstance) => {
    instance.addHook('onRequest', authGuard);
    await instance.register(accountRoutes, { prefix: '/account' });
  });
  await app.ready();

  const reg = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'parent@famille.fr', password: 'motdepasse123' },
  });
  token = reg.json().token;
});

afterEach(async () => {
  await app.close();
  closeDatabase();
});

test('GET /account/me retourne email et createdAt', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/account/me',
    headers: { authorization: `Bearer ${token}` },
  });
  expect(res.statusCode).toBe(200);
  const body = res.json();
  expect(body.email).toBe('parent@famille.fr');
  expect(body.createdAt).toBeDefined();
  expect(typeof body.createdAt).toBe('string');
});

test('GET /account/me retourne 401 sans token', async () => {
  const res = await app.inject({ method: 'GET', url: '/account/me' });
  expect(res.statusCode).toBe(401);
});

test('POST /account/change-password change le mot de passe', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/account/change-password',
    headers: { authorization: `Bearer ${token}` },
    payload: { currentPassword: 'motdepasse123', newPassword: 'nouveau456' },
  });
  expect(res.statusCode).toBe(200);
  expect(res.json()).toEqual({ ok: true });

  const oldLogin = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: { email: 'parent@famille.fr', password: 'motdepasse123' },
  });
  expect(oldLogin.statusCode).toBe(401);

  const newLogin = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: { email: 'parent@famille.fr', password: 'nouveau456' },
  });
  expect(newLogin.statusCode).toBe(200);
});

test('POST /account/change-password refuse currentPassword incorrect', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/account/change-password',
    headers: { authorization: `Bearer ${token}` },
    payload: { currentPassword: 'mauvais', newPassword: 'nouveau456' },
  });
  expect(res.statusCode).toBe(401);
});

test('POST /account/change-password refuse newPassword < 6 chars', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/account/change-password',
    headers: { authorization: `Bearer ${token}` },
    payload: { currentPassword: 'motdepasse123', newPassword: 'court' },
  });
  expect(res.statusCode).toBe(400);
});

test('POST /account/change-password retourne 401 sans token', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/account/change-password',
    payload: { currentPassword: 'motdepasse123', newPassword: 'nouveau456' },
  });
  expect(res.statusCode).toBe(401);
});

test('DELETE /account supprime la famille et toutes ses donnees liees', async () => {
  // Créer un profil enfant + une tâche + une completion + une recompense + un achat + une pénalité
  const db = getDatabase();
  const familyId = 1;
  const profileResult = db.prepare(
    'INSERT INTO profiles (family_id, name, type, animal_type, animal_name) VALUES (?, ?, ?, ?, ?)'
  ).run(familyId, 'Enfant', 'child', 'cat', 'Felix');
  const profileId = profileResult.lastInsertRowid;
  const taskResult = db.prepare(
    'INSERT INTO tasks (family_id, name, icon, points, type, recurrence) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(familyId, 'Tache', '🧹', 10, 'free', 'once');
  const taskId = taskResult.lastInsertRowid;
  db.prepare(
    'INSERT INTO task_completions (task_id, profile_id, completed_at) VALUES (?, ?, ?)'
  ).run(taskId, profileId, new Date().toISOString());
  const rewardResult = db.prepare(
    'INSERT INTO rewards (family_id, name, cost, type) VALUES (?, ?, ?, ?)'
  ).run(familyId, 'Bonbon', 50, 'real');
  const rewardId = rewardResult.lastInsertRowid;
  db.prepare(
    'INSERT INTO purchased_rewards (reward_id, profile_id, purchased_at) VALUES (?, ?, ?)'
  ).run(rewardId, profileId, new Date().toISOString());
  db.prepare(
    'INSERT INTO penalties (profile_id, points, reason, created_at) VALUES (?, ?, ?, ?)'
  ).run(profileId, 5, 'test', new Date().toISOString());

  const res = await app.inject({
    method: 'DELETE',
    url: '/account',
    headers: { authorization: `Bearer ${token}` },
    payload: { password: 'motdepasse123' },
  });
  expect(res.statusCode).toBe(204);

  // Vérifier que tout est supprimé
  expect(db.prepare('SELECT * FROM families WHERE id = ?').get(familyId)).toBeUndefined();
  expect(db.prepare('SELECT * FROM profiles WHERE family_id = ?').all(familyId)).toEqual([]);
  expect(db.prepare('SELECT * FROM tasks WHERE family_id = ?').all(familyId)).toEqual([]);
  expect(db.prepare('SELECT * FROM rewards WHERE family_id = ?').all(familyId)).toEqual([]);
  expect(db.prepare('SELECT * FROM task_completions WHERE profile_id = ?').all(profileId)).toEqual([]);
  expect(db.prepare('SELECT * FROM purchased_rewards WHERE profile_id = ?').all(profileId)).toEqual([]);
  expect(db.prepare('SELECT * FROM penalties WHERE profile_id = ?').all(profileId)).toEqual([]);
});

test('DELETE /account refuse password invalide', async () => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/account',
    headers: { authorization: `Bearer ${token}` },
    payload: { password: 'mauvais' },
  });
  expect(res.statusCode).toBe(401);
});

test('DELETE /account refuse password manquant', async () => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/account',
    headers: { authorization: `Bearer ${token}` },
    payload: {},
  });
  expect(res.statusCode).toBe(400);
});

test('DELETE /account retourne 401 sans token', async () => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/account',
    payload: { password: 'motdepasse123' },
  });
  expect(res.statusCode).toBe(401);
});
