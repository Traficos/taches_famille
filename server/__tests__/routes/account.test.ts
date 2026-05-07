process.env.NODE_ENV = 'test';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { initDatabase, closeDatabase } from '../../src/db/database';
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
