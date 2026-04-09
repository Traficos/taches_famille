import { apiFetch } from './client';

export interface Penalty {
  id: number;
  profile_id: number;
  points: number;
  reason: string;
  created_at: string;
}

export async function createPenalty(profileId: number, points: number, reason: string): Promise<void> {
  await apiFetch('/penalties', {
    method: 'POST',
    body: JSON.stringify({ profileId, points, reason }),
  });
}

export async function getPenaltiesForProfile(profileId: number): Promise<Penalty[]> {
  return apiFetch<Penalty[]>(`/penalties/${profileId}`);
}

export async function getPenaltyCountForProfile(profileId: number): Promise<number> {
  const res = await apiFetch<{ count: number }>(`/penalties/${profileId}/count`);
  return res.count;
}

export async function deletePenalty(penaltyId: number): Promise<void> {
  await apiFetch(`/penalties/${penaltyId}`, { method: 'DELETE' });
}
