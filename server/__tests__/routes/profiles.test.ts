import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase, closeDatabase } from '../../src/db/database';
import { authRoutes } from '../../src/routes/auth';
import { profileRoutes } from '../../src/routes/profiles';
import { authGuard } from '../../src/middleware/auth';

let app: ReturnType<typeof Fastify>;
let token: string;

beforeEach(async () => {
  closeDatabase();
  getDatabase(':memory:');
  app = Fastify();
  await app.register(cors);
  await app.register(authRoutes, { prefix: '/auth' });
  app.addHook('onRequest', authGuard);
  await app.register(profileRoutes, { prefix: '/profiles' });
  await app.ready();

  const res = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { email: 'test@famille.fr', password: 'motdepasse123' },
  });
  token = res.json().token;
});

afterEach(async () => {
  await app.close();
  closeDatabase();
});

function headers() {
  return { authorization: `Bearer ${token}` };
}

test('GET /profiles retourne un tableau vide au debut', async () => {
  const res = await app.inject({ method: 'GET', url: '/profiles', headers: headers() });
  expect(res.statusCode).toBe(200);
  expect(res.json()).toEqual([]);
});

test('POST /profiles cree un profil enfant', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/profiles',
    headers: headers(),
    payload: { name: 'Alice', type: 'child', animalType: 'cat', animalName: 'Minou' },
  });
  expect(res.statusCode).toBe(201);
  expect(res.json().id).toBeDefined();
});

test('POST /profiles cree un profil parent avec PIN', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/profiles',
    headers: headers(),
    payload: { name: 'Papa', type: 'parent', pin: '1234' },
  });
  expect(res.statusCode).toBe(201);
});

test('GET /profiles retourne les profils de la famille', async () => {
  await app.inject({
    method: 'POST', url: '/profiles', headers: headers(),
    payload: { name: 'Alice', type: 'child', animalType: 'cat', animalName: 'Minou' },
  });
  const res = await app.inject({ method: 'GET', url: '/profiles', headers: headers() });
  expect(res.json()).toHaveLength(1);
  expect(res.json()[0].name).toBe('Alice');
});

test('PUT /profiles/:id modifie un profil', async () => {
  const create = await app.inject({
    method: 'POST', url: '/profiles', headers: headers(),
    payload: { name: 'Alice', type: 'child', animalType: 'cat', animalName: 'Minou' },
  });
  const id = create.json().id;
  const res = await app.inject({
    method: 'PUT', url: `/profiles/${id}`, headers: headers(),
    payload: { name: 'Alicia', animalType: 'dog', animalName: 'Rex' },
  });
  expect(res.statusCode).toBe(200);
});

test('DELETE /profiles/:id supprime un profil', async () => {
  const create = await app.inject({
    method: 'POST', url: '/profiles', headers: headers(),
    payload: { name: 'Alice', type: 'child', animalType: 'cat', animalName: 'Minou' },
  });
  const id = create.json().id;
  const res = await app.inject({ method: 'DELETE', url: `/profiles/${id}`, headers: headers() });
  expect(res.statusCode).toBe(200);
  const list = await app.inject({ method: 'GET', url: '/profiles', headers: headers() });
  expect(list.json()).toHaveLength(0);
});

test('POST /profiles/:id/verify-pin verifie le PIN', async () => {
  const create = await app.inject({
    method: 'POST', url: '/profiles', headers: headers(),
    payload: { name: 'Papa', type: 'parent', pin: '1234' },
  });
  const id = create.json().id;
  const ok = await app.inject({
    method: 'POST', url: `/profiles/${id}/verify-pin`, headers: headers(),
    payload: { pin: '1234' },
  });
  expect(ok.json().valid).toBe(true);
  const fail = await app.inject({
    method: 'POST', url: `/profiles/${id}/verify-pin`, headers: headers(),
    payload: { pin: '0000' },
  });
  expect(fail.json().valid).toBe(false);
});
