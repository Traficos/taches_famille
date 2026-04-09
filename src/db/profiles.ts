import { SQLiteDatabase } from 'expo-sqlite';

export interface Profile {
  id: number;
  name: string;
  type: 'parent' | 'child';
  pin: string | null;
  animal_type: string | null;
  animal_name: string | null;
  animal_stage: string;
  total_points: number;
  current_points: number;
}

export async function createParentProfile(
  db: SQLiteDatabase,
  name: string,
  pin: string,
): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO profiles (name, type, pin) VALUES (?, ?, ?)',
    name, 'parent', pin,
  );
  return result.lastInsertRowId;
}

export async function createChildProfile(
  db: SQLiteDatabase,
  name: string,
  animalType: string,
  animalName: string,
): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO profiles (name, type, animal_type, animal_name) VALUES (?, ?, ?, ?)',
    name, 'child', animalType, animalName,
  );
  return result.lastInsertRowId;
}

export async function getAllProfiles(db: SQLiteDatabase): Promise<Profile[]> {
  return db.getAllAsync<Profile>('SELECT * FROM profiles ORDER BY type DESC, name ASC');
}

export async function getProfileById(db: SQLiteDatabase, id: number): Promise<Profile> {
  return db.getFirstAsync<Profile>('SELECT * FROM profiles WHERE id = ?', id) as Promise<Profile>;
}

export async function updateChildPoints(
  db: SQLiteDatabase,
  profileId: number,
  delta: number,
): Promise<void> {
  if (delta > 0) {
    await db.runAsync(
      'UPDATE profiles SET total_points = total_points + ?, current_points = current_points + ? WHERE id = ?',
      delta, delta, profileId,
    );
  } else {
    await db.runAsync(
      'UPDATE profiles SET current_points = current_points + ? WHERE id = ?',
      delta, profileId,
    );
  }
}

export async function updateAnimalStage(
  db: SQLiteDatabase,
  profileId: number,
  stage: string,
): Promise<void> {
  await db.runAsync('UPDATE profiles SET animal_stage = ? WHERE id = ?', stage, profileId);
}

export async function updateChildProfile(
  db: SQLiteDatabase,
  profileId: number,
  name: string,
  animalType: string,
  animalName: string,
): Promise<void> {
  await db.runAsync(
    'UPDATE profiles SET name = ?, animal_type = ?, animal_name = ? WHERE id = ?',
    name, animalType, animalName, profileId,
  );
}

export async function verifyPin(
  db: SQLiteDatabase,
  profileId: number,
  pin: string,
): Promise<boolean> {
  const profile = await getProfileById(db, profileId);
  return profile.pin === pin;
}

export async function deleteProfile(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM profiles WHERE id = ?', id);
}
