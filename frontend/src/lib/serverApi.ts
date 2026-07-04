// src/lib/serverApi.ts
// Server-side API fetching utilities for Next.js Server Components

const rawApiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_BASE = rawApiBase.replace(/\/$/, '').endsWith('/api/v1')
  ? rawApiBase.replace(/\/$/, '')
  : `${rawApiBase.replace(/\/$/, '')}/api/v1`;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: any;
}

export async function serverFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T | any> {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API ${path} → ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

// Specific server-side fetchers
export const serverApi = {
  getProjects: async () => serverFetch('/projects?status=published&limit=100'),
  getFeaturedProjects: async () => serverFetch('/projects/featured'),
  getProjectBySlug: async (slug: string) => serverFetch(`/projects/slug/${slug}`),
  getHero: async () => serverFetch('/hero'),
  getAbout: async () => serverFetch('/about'),
  getExperience: async () => serverFetch('/experience'),
  getSkills: async () => serverFetch('/skills'),
  getSkillCategories: async () => serverFetch('/skills/categories'),
  getCertifications: async () => serverFetch('/certifications'),
  getStats: async () => serverFetch('/stats'),
  getResume: async () => serverFetch('/resume'),
};
