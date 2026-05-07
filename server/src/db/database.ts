import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import path from 'path';
import fs from 'fs';
import { ALL_TABLES } from './schema';

function txControl(sql: string): 'begin' | 'commit' | 'rollback' | null {
  const s = sql.trim().toUpperCase();
  if (s.startsWith('BEGIN')) return 'begin';
  if (s.startsWith('COMMIT') || s === 'END' || s.startsWith('END ')) return 'commit';
  if (s.startsWith('ROLLBACK')) return 'rollback';
  return null;
}

// Wrapper to provide a better-sqlite3-compatible API over sql.js
class DatabaseWrapper {
  private db: SqlJsDatabase;
  private dbPath: string | null;
  private inTransaction = false;

  constructor(db: SqlJsDatabase, dbPath: string | null) {
    this.db = db;
    this.dbPath = dbPath;
  }

  exec(sql: string): void {
    const ctrl = txControl(sql);
    if (ctrl === 'begin') {
      this.db.run(sql);
      this.inTransaction = true;
      // do NOT save — we're starting a transaction
    } else if (ctrl === 'commit' || ctrl === 'rollback') {
      this.db.run(sql);
      this.inTransaction = false;
      this.save();
    } else {
      this.db.run(sql);
      if (!this.inTransaction) this.save();
    }
  }

  pragma(pragma: string): void {
    this.db.run(`PRAGMA ${pragma}`);
  }

  prepare(sql: string) {
    const db = this.db;
    const wrapper = this;
    return {
      get(...params: any[]): any {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        let result: any = undefined;
        if (stmt.step()) {
          result = stmt.getAsObject();
        }
        stmt.free();
        return result;
      },
      all(...params: any[]): any[] {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        const results: any[] = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      },
      run(...params: any[]): { lastInsertRowid: number; changes: number } {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        stmt.step();
        stmt.free();
        const lastId = db.exec('SELECT last_insert_rowid() as id');
        const changesResult = db.exec('SELECT changes() as c');
        const lastInsertRowid = lastId[0]?.values[0]?.[0] as number ?? 0;
        const changes = changesResult[0]?.values[0]?.[0] as number ?? 0;
        if (!wrapper.inTransaction) wrapper.save();
        return { lastInsertRowid, changes };
      },
    };
  }

  close(): void {
    this.save();
    this.db.close();
  }

  private save(): void {
    if (!this.dbPath) return;
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(this.dbPath, buffer);
  }
}

let db: DatabaseWrapper | null = null;
let sqlJsReady: typeof initSqlJs extends () => Promise<infer R> ? R : never;

export async function initDatabase(dbPath?: string): Promise<DatabaseWrapper> {
  if (db) return db;
  const SQL = await initSqlJs();
  sqlJsReady = SQL;

  const inMemory = dbPath === ':memory:';
  const resolvedPath = inMemory ? null : (dbPath ?? path.join(__dirname, '../../data/tache-famille.db'));

  let sqlDb: SqlJsDatabase;
  if (resolvedPath) {
    const dir = path.dirname(resolvedPath);
    fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(resolvedPath)) {
      const buffer = fs.readFileSync(resolvedPath);
      sqlDb = new SQL.Database(buffer);
    } else {
      sqlDb = new SQL.Database();
    }
  } else {
    sqlDb = new SQL.Database();
  }

  db = new DatabaseWrapper(sqlDb, resolvedPath);
  db.pragma('foreign_keys = ON');
  for (const sql of ALL_TABLES) {
    db.exec(sql);
  }
  return db;
}

export function getDatabase(): DatabaseWrapper {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
