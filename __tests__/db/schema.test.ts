import { ALL_TABLES, CREATE_PROFILES, CREATE_TASKS, CREATE_REWARDS } from '../../src/db/schema';

describe('schema', () => {
  it('exports 5 CREATE TABLE statements', () => {
    expect(ALL_TABLES).toHaveLength(5);
  });

  it('profiles table has correct columns', () => {
    expect(CREATE_PROFILES).toContain('name TEXT NOT NULL');
    expect(CREATE_PROFILES).toContain("type TEXT NOT NULL CHECK(type IN ('parent', 'child'))");
    expect(CREATE_PROFILES).toContain('total_points INTEGER DEFAULT 0');
    expect(CREATE_PROFILES).toContain('current_points INTEGER DEFAULT 0');
    expect(CREATE_PROFILES).toContain('animal_stage TEXT DEFAULT');
  });

  it('tasks table has recurrence constraint', () => {
    expect(CREATE_TASKS).toContain("recurrence TEXT NOT NULL CHECK(recurrence IN ('once', 'daily', 'weekly'))");
  });

  it('rewards table has type constraint', () => {
    expect(CREATE_REWARDS).toContain("type TEXT NOT NULL CHECK(type IN ('real', 'accessory'))");
  });
});
