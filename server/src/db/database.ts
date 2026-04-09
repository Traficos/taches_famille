import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { ALL_TABLES } from './schema';

let db: Database.Database | null = null;

export function getDatabase(dbPath?: string): Database.Database {
  if (db) return db;
  const resolvedPath = dbPath ?? path.join(__dirname, '../../data/tache-famille.db');
  const dir = path.dirname(resolvedPath);
  fs.mkdirSync(dir, { recursive: true });
  db = new Database(resolvedPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  for (const sql of ALL_TABLES) {
    db.exec(sql);
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
