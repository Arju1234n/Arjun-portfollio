// src/lib/api.ts
// Shared fetch helper for the portfolio frontend.
// Reads NEXT_PUBLIC_API_URL (set in .env.local) and tolerates values with or
// without /api/v1.

const rawBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const BASE = rawBase.replace(/\/$/, '').endsWith('/api/v1')
  ? rawBase.replace(/\/$/, '')
  : `${rawBase.replace(/\/$/, '')}/api/v1`;

export async function apiFetch<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`API ${path} → ${res.status}`);
  }
  const json = await res.json();
  return json.data as T;
}
