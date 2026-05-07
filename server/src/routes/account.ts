import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { getDatabase } from '../db/database';
import { Family } from '../types';

export async function accountRoutes(app: FastifyInstance) {
  // GET /account/me — implémenté en Task 2
  // POST /account/change-password — implémenté en Task 3
  // DELETE /account — implémenté en Task 4
}
