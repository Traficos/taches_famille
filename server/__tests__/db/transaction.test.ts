process.env.NODE_ENV = 'test';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { initDatabase, closeDatabase, getDatabase } from '../../src/db/database';

let tmpFile: string;

beforeEach(async () => {
  closeDatabase();
  tmpFile = path.join(os.tmpdir(), `tf-tx-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
  await initDatabase(tmpFile);
});

afterEach(() => {
  closeDatabase();
  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
});

test('transaction with multiple writes followed by COMMIT persists all rows', async () => {
  const db = getDatabase();
  // Insert a family for setup
  db.prepare(
    'INSERT INTO families (email, password_hash, created_at) VALUES (?, ?, ?)'
  ).run('a@b.fr', 'hash', new Date().toISOString());

  db.exec('BEGIN');
  db.prepare(
    'INSERT INTO profiles (family_id, name, type) VALUES (?, ?, ?)'
  ).run(1, 'P1', 'parent');
  db.prepare(
    'INSERT INTO profiles (family_id, name, type) VALUES (?, ?, ?)'
  ).run(1, 'P2', 'parent');
  db.exec('COMMIT');

  const profiles = db.prepare('SELECT name FROM profiles WHERE family_id = ?').all(1);
  expect(profiles.length).toBe(2);
});

test('transaction with ROLLBACK undoes all writes (the bug repro)', async () => {
  const db = getDatabase();
  db.prepare(
    'INSERT INTO families (email, password_hash, created_at) VALUES (?, ?, ?)'
  ).run('a@b.fr', 'hash', new Date().toISOString());

  db.exec('BEGIN');
  db.prepare(
    'INSERT INTO profiles (family_id, name, type) VALUES (?, ?, ?)'
  ).run(1, 'P1', 'parent');
  db.prepare(
    'INSERT INTO profiles (family_id, name, type) VALUES (?, ?, ?)'
  ).run(1, 'P2', 'parent');

  // The bug: ROLLBACK throws "cannot rollback - no transaction is active"
  // because save() between statements closed the transaction
  expect(() => db.exec('ROLLBACK')).not.toThrow();

  const profiles = db.prepare('SELECT name FROM profiles WHERE family_id = ?').all(1);
  expect(profiles.length).toBe(0); // both inserts rolled back
});
