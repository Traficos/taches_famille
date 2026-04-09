export const CREATE_FAMILIES = `
CREATE TABLE IF NOT EXISTS families (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);`;

export const CREATE_PROFILES = `
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  family_id INTEGER NOT NULL REFERENCES families(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('parent', 'child')),
  pin TEXT,
  animal_type TEXT,
  animal_name TEXT,
  animal_stage TEXT DEFAULT 'egg',
  total_points INTEGER DEFAULT 0,
  current_points INTEGER DEFAULT 0
);`;

export const CREATE_TASKS = `
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  family_id INTEGER NOT NULL REFERENCES families(id),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  points INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('assigned', 'free')),
  assigned_to INTEGER REFERENCES profiles(id),
  recurrence TEXT NOT NULL CHECK(recurrence IN ('once', 'daily', 'weekly', 'custom')),
  recurrence_days TEXT,
  active INTEGER DEFAULT 1
);`;

export const CREATE_TASK_COMPLETIONS = `
CREATE TABLE IF NOT EXISTS task_completions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES tasks(id),
  profile_id INTEGER NOT NULL REFERENCES profiles(id),
  completed_at TEXT NOT NULL
);`;

export const CREATE_REWARDS = `
CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  family_id INTEGER NOT NULL REFERENCES families(id),
  name TEXT NOT NULL,
  cost INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('real', 'accessory')),
  accessory_key TEXT
);`;

export const CREATE_PURCHASED_REWARDS = `
CREATE TABLE IF NOT EXISTS purchased_rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reward_id INTEGER NOT NULL REFERENCES rewards(id),
  profile_id INTEGER NOT NULL REFERENCES profiles(id),
  purchased_at TEXT NOT NULL,
  used INTEGER DEFAULT 0
);`;

export const CREATE_PENALTIES = `
CREATE TABLE IF NOT EXISTS penalties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL REFERENCES profiles(id),
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL
);`;

export const ALL_TABLES = [
  CREATE_FAMILIES,
  CREATE_PROFILES,
  CREATE_TASKS,
  CREATE_TASK_COMPLETIONS,
  CREATE_REWARDS,
  CREATE_PURCHASED_REWARDS,
  CREATE_PENALTIES,
];
