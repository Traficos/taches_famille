import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch, API_URL } from './client';

const TOKEN_KEY = 'auth_token';

export interface AccountInfo {
  email: string;
  createdAt: string;
}

export async function getMe(): Promise<AccountInfo> {
  return apiFetch<AccountInfo>('/account/me');
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await apiFetch('/account/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function deleteAccount(password: string): Promise<void> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_URL}/account`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Erreur ${res.status}`);
  }
}
