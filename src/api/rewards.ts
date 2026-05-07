import { apiFetch } from './client';

export interface Reward {
  id: number;
  family_id: number;
  name: string;
  cost: number;
  type: 'real';
  accessory_key: null;
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

export async function getRealRewards(): Promise<Reward[]> {
  return apiFetch<Reward[]>('/rewards/real');
}

export async function createReward(input: { name: string; cost: number }): Promise<number> {
  const res = await apiFetch<{ id: number }>('/rewards', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.id;
}

export async function deleteReward(id: number): Promise<void> {
  await apiFetch(`/rewards/${id}`, { method: 'DELETE' });
}

export async function purchaseReward(rewardId: number, profileId: number): Promise<number> {
  const res = await apiFetch<{ purchaseId: number }>(`/rewards/${rewardId}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ profileId }),
  });
  return res.purchaseId;
}

export async function getVouchersForChild(childId: number): Promise<Voucher[]> {
  return apiFetch<Voucher[]>(`/rewards/vouchers/${childId}`);
}

export async function markVoucherUsed(voucherId: number): Promise<void> {
  await apiFetch(`/rewards/vouchers/${voucherId}/use`, { method: 'PUT' });
}
