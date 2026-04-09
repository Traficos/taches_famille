import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase, closeDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';
import { profileRoutes } from '../../src/routes/profiles';
import { taskRoutes } from '../../src/routes/tasks';
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
  await app.register(taskRoutes, { prefix: '/tasks' });
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

test('POST /tasks cree une tache et GET la retourne', async () => {
  const res = await app.inject({
    method: 'POST', url: '/tasks', headers: headers(),
    payload: {
      name: 'Ranger chambre', icon: '🛏️', points: 10,
      type: 'assigned', assignedTo: childId, recurrence: 'daily', recurrenceDays: null,
    },
  });
  expect(res.statusCode).toBe(201);
  const list = await app.inject({ method: 'GET', url: '/tasks', headers: headers() });
  expect(list.json()).toHaveLength(1);
  expect(list.json()[0].name).toBe('Ranger chambre');
});

test('POST /tasks/:id/complete enregistre une completion', async () => {
  const task = await app.inject({
    method: 'POST', url: '/tasks', headers: headers(),
    payload: {
      name: 'Ranger', icon: '🛏️', points: 10,
      type: 'assigned', assignedTo: childId, recurrence: 'daily', recurrenceDays: null,
    },
  });
  const taskId = task.json().id;
  const res = await app.inject({
    method: 'POST', url: `/tasks/${taskId}/complete`, headers: headers(),
    payload: { profileId: childId },
  });
  expect(res.statusCode).toBe(200);
  expect(res.json().completionId).toBeDefined();
});

test('GET /tasks/:id/completed-today retourne le statut', async () => {
  const task = await app.inject({
    method: 'POST', url: '/tasks', headers: headers(),
    payload: {
      name: 'Ranger', icon: '🛏️', points: 10,
      type: 'assigned', assignedTo: childId, recurrence: 'daily', recurrenceDays: null,
    },
  });
  const taskId = task.json().id;
  const before = await app.inject({
    method: 'GET', url: `/tasks/${taskId}/completed-today?profileId=${childId}`, headers: headers(),
  });
  expect(before.json().completed).toBe(false);
  await app.inject({
    method: 'POST', url: `/tasks/${taskId}/complete`, headers: headers(),
    payload: { profileId: childId },
  });
  const after = await app.inject({
    method: 'GET', url: `/tasks/${taskId}/completed-today?profileId=${childId}`, headers: headers(),
  });
  expect(after.json().completed).toBe(true);
});

test('DELETE /tasks/:id desactive la tache', async () => {
  const task = await app.inject({
    method: 'POST', url: '/tasks', headers: headers(),
    payload: {
      name: 'Ranger', icon: '🛏️', points: 10,
      type: 'assigned', assignedTo: childId, recurrence: 'daily', recurrenceDays: null,
    },
  });
  const taskId = task.json().id;
  await app.inject({ method: 'DELETE', url: `/tasks/${taskId}`, headers: headers() });
  const list = await app.inject({ method: 'GET', url: '/tasks', headers: headers() });
  expect(list.json()).toHaveLength(0);
});
