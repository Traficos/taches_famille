import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase, closeDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';

let app: ReturnType<typeof Fastify>;

beforeEach(async () => {
  closeDatabase();
  getDatabase(':memory:');
  app = Fastify();
  await app.register(cors);
  await app.register(authRoutes, { prefix: '/auth' });
  await app.ready();
});

afterEach(async () => {
  await app.close();
  closeDatabase();
});

test('POST /auth/register cree une famille et retourne un token', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  expect(res.statusCode).toBe(201);
  const body = res.json();
  expect(body.token).toBeDefined();
  expect(body.familyId).toBeDefined();
});

test('POST /auth/register refuse un email deja pris', async () => {
  await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  const res = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'autre123' },
  });
  expect(res.statusCode).toBe(409);
});

test('POST /auth/login retourne un token pour des identifiants valides', async () => {
  await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  const res = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  expect(res.statusCode).toBe(200);
  expect(res.json().token).toBeDefined();
});

test('POST /auth/login refuse un mauvais mot de passe', async () => {
  await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  const res = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: { email: 'test@famille.fr', password: 'mauvais' },
  });
  expect(res.statusCode).toBe(401);
});
