import jwt from 'jsonwebtoken';
import { createToken, verifyToken, JWT_SECRET } from '../../src/middleware/auth';

test('createToken returns a valid JWT with familyId', () => {
  const token = createToken(42);
  const decoded = jwt.verify(token, JWT_SECRET) as { familyId: number };
  expect(decoded.familyId).toBe(42);
});

test('verifyToken returns familyId for valid token', () => {
  const token = createToken(7);
  const result = verifyToken(token);
  expect(result).toEqual({ familyId: 7 });
});

test('verifyToken returns null for invalid token', () => {
  const result = verifyToken('invalid.token.here');
  expect(result).toBeNull();
});

test('verifyToken returns null for expired token', () => {
  const token = jwt.sign({ familyId: 1 }, JWT_SECRET, { expiresIn: '0s' });
  const result = verifyToken(token);
  expect(result).toBeNull();
});
