import * as SQLite from 'expo-sqlite';
import { ALL_TABLES } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('tache-famille.db');
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  for (const sql of ALL_TABLES) {
    await db.execAsync(sql);
  }
  // Migration: ajout colonne recurrence_days + support recurrence 'custom'
  try {
    await db.execAsync('ALTER TABLE tasks ADD COLUMN recurrence_days TEXT');
  } catch {
    // Colonne existe déjà
  }
  // Recréer la table si l'ancien CHECK constraint ne supporte pas 'custom'
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT NOT NULL,
        points INTEGER NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('assigned', 'free')),
        assigned_to INTEGER REFERENCES profiles(id),
        recurrence TEXT NOT NULL CHECK(recurrence IN ('once', 'daily', 'weekly', 'custom')),
        recurrence_days TEXT,
        active INTEGER DEFAULT 1
      );
      INSERT INTO tasks_new SELECT id, name, description, icon, points, type, assigned_to, recurrence, recurrence_days, active FROM tasks;
      DROP TABLE tasks;
      ALTER TABLE tasks_new RENAME TO tasks;
    `);
  } catch {
    // Migration déjà faite ou table déjà à jour
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
