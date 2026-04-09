import Fastify from 'fastify';
import cors from '@fastify/cors';
import { getDatabase } from './db/database';
import { authRoutes } from './routes/auth';
import { profileRoutes } from './routes/profiles';
import { taskRoutes } from './routes/tasks';
import { rewardRoutes } from './routes/rewards';
import { penaltyRoutes } from './routes/penalties';
import { authGuard } from './middleware/auth';

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, {
    origin: true,
  });

  // Routes publiques (pas de JWT)
  await app.register(authRoutes, { prefix: '/auth' });

  // Routes protegees par JWT
  await app.register(async function protectedRoutes(instance) {
    instance.addHook('onRequest', authGuard);
    await instance.register(profileRoutes, { prefix: '/profiles' });
    await instance.register(taskRoutes, { prefix: '/tasks' });
    await instance.register(rewardRoutes, { prefix: '/rewards' });
    await instance.register(penaltyRoutes, { prefix: '/penalties' });
  });

  // Initialiser la BDD
  getDatabase();

  const port = parseInt(process.env.PORT ?? '3000', 10);
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen({ port, host });
}

start().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
