import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase, closeDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';
import { profileRoutes } from '../../src/routes/profiles';
import { rewardRoutes } from '../../src/routes/rewards';
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
  await app.register(rewardRoutes, { prefix: '/rewards' });
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

test('POST /rewards cree une recompense', async () => {
  const res = await app.inject({
    method: 'POST', url: '/rewards', headers: headers(),
    payload: { name: 'Sortie cinema', cost: 100, type: 'real' },
  });
  expect(res.statusCode).toBe(201);
  expect(res.json().id).toBeDefined();
});

test('GET /rewards retourne les recompenses de la famille', async () => {
  await app.inject({
    method: 'POST', url: '/rewards', headers: headers(),
    payload: { name: 'Sortie cinema', cost: 100, type: 'real' },
  });
  const res = await app.inject({ method: 'GET', url: '/rewards', headers: headers() });
  expect(res.json()).toHaveLength(1);
});

test('POST /rewards/:id/purchase cree un achat', async () => {
  const reward = await app.inject({
    method: 'POST', url: '/rewards', headers: headers(),
    payload: { name: 'Sortie cinema', cost: 100, type: 'real' },
  });
  const rewardId = reward.json().id;
  const res = await app.inject({
    method: 'POST', url: `/rewards/${rewardId}/purchase`, headers: headers(),
    payload: { profileId: childId },
  });
  expect(res.statusCode).toBe(200);
  expect(res.json().purchaseId).toBeDefined();
});

test('GET /rewards/vouchers/:childId retourne les bons', async () => {
  const reward = await app.inject({
    method: 'POST', url: '/rewards', headers: headers(),
    payload: { name: 'Sortie cinema', cost: 100, type: 'real' },
  });
  await app.inject({
    method: 'POST', url: `/rewards/${reward.json().id}/purchase`, headers: headers(),
    payload: { profileId: childId },
  });
  const res = await app.inject({
    method: 'GET', url: `/rewards/vouchers/${childId}`, headers: headers(),
  });
  expect(res.json()).toHaveLength(1);
  expect(res.json()[0].reward_name).toBe('Sortie cinema');
});

test('DELETE /rewards/:id supprime une recompense', async () => {
  const reward = await app.inject({
    method: 'POST', url: '/rewards', headers: headers(),
    payload: { name: 'Test', cost: 50, type: 'real' },
  });
  await app.inject({ method: 'DELETE', url: `/rewards/${reward.json().id}`, headers: headers() });
  const list = await app.inject({ method: 'GET', url: '/rewards', headers: headers() });
  expect(list.json()).toHaveLength(0);
});
