import { SQLiteDatabase } from 'expo-sqlite';
import { ACCESSORIES } from '../constants/accessories';

export interface Reward {
  id: number;
  name: string;
  cost: number;
  type: 'real' | 'accessory';
  accessory_key: string | null;
}

export interface Voucher {
  id: number;
  reward_id: number;
  profile_id: number;
  purchased_at: string;
  used: number;
  reward_name: string;
  reward_cost: number;
}

interface CreateRewardInput {
  name: string;
  cost: number;
  type: 'real' | 'accessory';
  accessoryKey?: string;
}

export async function createReward(db: SQLiteDatabase, input: CreateRewardInput): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO rewards (name, cost, type, accessory_key) VALUES (?, ?, ?, ?)',
    input.name, input.cost, input.type, input.accessoryKey ?? null,
  );
  return result.lastInsertRowId;
}

export async function seedAccessories(db: SQLiteDatabase): Promise<void> {
  const existing = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM rewards WHERE type = 'accessory'",
  );
  if ((existing?.count ?? 0) > 0) return;

  for (const acc of ACCESSORIES) {
    await db.runAsync(
      'INSERT INTO rewards (name, cost, type, accessory_key) VALUES (?, ?, ?, ?)',
      acc.name, acc.cost, 'accessory', acc.key,
    );
  }
}

export async function getAllRewards(db: SQLiteDatabase): Promise<Reward[]> {
  return db.getAllAsync<Reward>('SELECT * FROM rewards ORDER BY type, cost ASC');
}

export async function getRealRewards(db: SQLiteDatabase): Promise<Reward[]> {
  return db.getAllAsync<Reward>("SELECT * FROM rewards WHERE type = 'real' ORDER BY cost ASC");
}

export async function getAccessoryRewards(db: SQLiteDatabase): Promise<Reward[]> {
  return db.getAllAsync<Reward>("SELECT * FROM rewards WHERE type = 'accessory' ORDER BY cost ASC");
}

export async function purchaseReward(
  db: SQLiteDatabase,
  rewardId: number,
  profileId: number,
): Promise<number> {
  const now = new Date().toISOString();
  const result = await db.runAsync(
    'INSERT INTO purchased_rewards (reward_id, profile_id, purchased_at) VALUES (?, ?, ?)',
    rewardId, profileId, now,
  );
  return result.lastInsertRowId;
}

export async function getVouchersForChild(db: SQLiteDatabase, childId: number): Promise<Voucher[]> {
  return db.getAllAsync<Voucher>(
    `SELECT pr.*, r.name as reward_name, r.cost as reward_cost
     FROM purchased_rewards pr
     JOIN rewards r ON r.id = pr.reward_id
     WHERE pr.profile_id = ? AND r.type = 'real'
     ORDER BY pr.purchased_at DESC`,
    childId,
  );
}

export async function getAccessoriesOwned(db: SQLiteDatabase, childId: number): Promise<string[]> {
  const rows = await db.getAllAsync<{ accessory_key: string }>(
    `SELECT r.accessory_key FROM purchased_rewards pr
     JOIN rewards r ON r.id = pr.reward_id
     WHERE pr.profile_id = ? AND r.type = 'accessory'`,
    childId,
  );
  return rows.map(r => r.accessory_key);
}

export async function markVoucherUsed(db: SQLiteDatabase, voucherId: number): Promise<void> {
  await db.runAsync('UPDATE purchased_rewards SET used = 1 WHERE id = ?', voucherId);
}

export async function deleteReward(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM rewards WHERE id = ?', id);
}
