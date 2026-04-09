import { getDatabase, closeDatabase } from '../../src/db/database';

afterEach(() => {
  closeDatabase();
});

test('getDatabase returns a database with all tables', () => {
  const db = getDatabase();
  const tables = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  ).all() as { name: string }[];
  const names = tables.map(t => t.name);
  expect(names).toContain('families');
  expect(names).toContain('profiles');
  expect(names).toContain('tasks');
  expect(names).toContain('task_completions');
  expect(names).toContain('rewards');
  expect(names).toContain('purchased_rewards');
  expect(names).toContain('penalties');
});

test('profiles table has family_id column', () => {
  const db = getDatabase();
  const info = db.prepare('PRAGMA table_info(profiles)').all() as { name: string }[];
  const columns = info.map(c => c.name);
  expect(columns).toContain('family_id');
});

test('tasks table has family_id column', () => {
  const db = getDatabase();
  const info = db.prepare('PRAGMA table_info(tasks)').all() as { name: string }[];
  const columns = info.map(c => c.name);
  expect(columns).toContain('family_id');
});

test('rewards table has family_id column', () => {
  const db = getDatabase();
  const info = db.prepare('PRAGMA table_info(rewards)').all() as { name: string }[];
  const columns = info.map(c => c.name);
  expect(columns).toContain('family_id');
});
