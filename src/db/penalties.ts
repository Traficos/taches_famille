import { SQLiteDatabase } from 'expo-sqlite';

export interface Penalty {
  id: number;
  profile_id: number;
  points: number;
  reason: string;
  created_at: string;
}

export async function createPenalty(
  db: SQLiteDatabase,
  profileId: number,
  points: number,
  reason: string,
): Promise<void> {
  const now = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO penalties (profile_id, points, reason, created_at) VALUES (?, ?, ?, ?)',
    profileId, points, reason, now,
  );
}

export async function getPenaltiesForProfile(
  db: SQLiteDatabase,
  profileId: number,
): Promise<Penalty[]> {
  return db.getAllAsync<Penalty>(
    'SELECT * FROM penalties WHERE profile_id = ? ORDER BY created_at DESC',
    profileId,
  );
}

export async function getPenaltyCountForProfile(
  db: SQLiteDatabase,
  profileId: number,
): Promise<number> {
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM penalties WHERE profile_id = ?',
    profileId,
  );
  return row?.count ?? 0;
}

export async function deletePenalty(
  db: SQLiteDatabase,
  penaltyId: number,
): Promise<void> {
  await db.runAsync('DELETE FROM penalties WHERE id = ?', penaltyId);
}
