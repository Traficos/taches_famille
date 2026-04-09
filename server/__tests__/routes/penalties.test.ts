import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase, closeDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';
import { profileRoutes } from '../../src/routes/profiles';
import { penaltyRoutes } from '../../src/routes/penalties';
import { authGuard } from '../../src/middleware/auth';

let app: ReturnType<typeof Fastify>;
let token: string;
let childId: number;

beforeEach(async () => {
  closeDatabase();
  getDatabase(':memory:');
  app = Fastify();
  await app.register(cors);
  await app.register(authRoutes, { prefix: '/auth' });
  app.addHook('onRequest', authGuard);
  await app.register(profileRoutes, { prefix: '/profiles' });
  await app.register(penaltyRoutes, { prefix: '/penalties' });
  await app.ready();

  const res = await app.inject({
    method: 'POST', url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  token = res.json().token;
  const child = await app.inject({
    method: 'POST', url: '/profiles', headers: { authorization: `Bearer ${token}` },
    payload: { name: 'Alice', type: 'child', animalType: 'cat', animalName: 'Minou' },
  });
  childId = child.json().id;
});

afterEach(async () => {
  await app.close();
  closeDatabase();
});

function headers() {
  return { authorization: `Bearer ${token}` };
}

test('POST /penalties cree une penalite', async () => {
  const res = await app.inject({
    method: 'POST', url: '/penalties', headers: headers(),
    payload: { profileId: childId, points: 10, reason: 'Dispute' },
  });
  expect(res.statusCode).toBe(201);
});

test('GET /penalties/:profileId retourne les penalites', async () => {
  await app.inject({
    method: 'POST', url: '/penalties', headers: headers(),
    payload: { profileId: childId, points: 10, reason: 'Dispute' },
  });
  const res = await app.inject({
    method: 'GET', url: `/penalties/${childId}`, headers: headers(),
  });
  expect(res.json()).toHaveLength(1);
  expect(res.json()[0].reason).toBe('Dispute');
});

test('DELETE /penalties/:id supprime une penalite', async () => {
  const create = await app.inject({
    method: 'POST', url: '/penalties', headers: headers(),
    payload: { profileId: childId, points: 10, reason: 'Dispute' },
  });
  const id = create.json().id;
  await app.inject({ method: 'DELETE', url: `/penalties/${id}`, headers: headers() });
  const list = await app.inject({
    method: 'GET', url: `/penalties/${childId}`, headers: headers(),
  });
  expect(list.json()).toHaveLength(0);
});
