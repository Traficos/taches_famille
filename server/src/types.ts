export interface Family {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

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

export interface Task {
  id: number;
  family_id: number;
  name: string;
  description: string | null;
  icon: string;
  points: number;
  type: 'assigned' | 'free';
  assigned_to: number | null;
  recurrence: 'once' | 'daily' | 'weekly' | 'custom';
  recurrence_days: string | null;
  active: number;
}

export interface TaskCompletion {
  id: number;
  task_id: number;
  profile_id: number;
  completed_at: string;
}

export interface Reward {
  id: number;
  family_id: number;
  name: string;
  cost: number;
  type: 'real' | 'accessory';
  accessory_key: string | null;
}

export interface PurchasedReward {
  id: number;
  reward_id: number;
  profile_id: number;
  purchased_at: string;
  used: number;
}

export interface Voucher extends PurchasedReward {
  reward_name: string;
  reward_cost: number;
}

export interface Penalty {
  id: number;
  profile_id: number;
  points: number;
  reason: string;
  created_at: string;
}
