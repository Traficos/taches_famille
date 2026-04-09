import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

const defaultSecret = 'tache-famille-dev-secret-change-in-prod';
export const JWT_SECRET = process.env.JWT_SECRET ?? defaultSecret;
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

export function createToken(familyId: number): string {
  return jwt.sign({ familyId }, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string): { familyId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { familyId: number };
    return { familyId: decoded.familyId };
  } catch {
    return null;
  }
}

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Token manquant' });
  }
  const result = verifyToken(header.slice(7));
  if (!result) {
    return reply.status(401).send({ error: 'Token invalide' });
  }
  (request as any).familyId = result.familyId;
}
