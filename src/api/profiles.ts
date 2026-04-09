import { apiFetch } from './client';

export interface Profile {
  id: number;
  family_id: number;
  name: string;
  type: 'parent' | 'child';
  pin: string | null;
  animal_type: string | null;
  animal_name: string | null;
  animal_stage: string;
  total_points: number;
  current_points: number;
}

export async function getAllProfiles(): Promise<Profile[]> {
  return apiFetch<Profile[]>('/profiles');
}

export async function getProfileById(id: number): Promise<Profile> {
  return apiFetch<Profile>(`/profiles/${id}`);
}

export async function createParentProfile(name: string, pin: string): Promise<number> {
  const res = await apiFetch<{ id: number }>('/profiles', {
    method: 'POST',
    body: JSON.stringify({ name, type: 'parent', pin }),
  });
  return res.id;
}

export async function createChildProfile(name: string, animalType: string, animalName: string): Promise<number> {
  const res = await apiFetch<{ id: number }>('/profiles', {
    method: 'POST',
    body: JSON.stringify({ name, type: 'child', animalType, animalName }),
  });
  return res.id;
}

export async function updateChildProfile(profileId: number, name: string, animalType: string, animalName: string): Promise<void> {
  await apiFetch(`/profiles/${profileId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, animalType, animalName }),
  });
}

export async function updateChildPoints(profileId: number, delta: number): Promise<void> {
  await apiFetch(`/profiles/${profileId}/points`, {
    method: 'PUT',
    body: JSON.stringify({ delta }),
  });
}

export async function updateAnimalStage(profileId: number, stage: string): Promise<void> {
  await apiFetch(`/profiles/${profileId}/stage`, {
    method: 'PUT',
    body: JSON.stringify({ stage }),
  });
}

export async function verifyPin(profileId: number, pin: string): Promise<boolean> {
  const res = await apiFetch<{ valid: boolean }>(`/profiles/${profileId}/verify-pin`, {
    method: 'POST',
    body: JSON.stringify({ pin }),
  });
  return res.valid;
}

export async function deleteProfile(id: number): Promise<void> {
  await apiFetch(`/profiles/${id}`, { method: 'DELETE' });
}
