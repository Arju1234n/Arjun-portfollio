'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  avatar?: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,

      setToken: (token) => {
        set({ token });
        if (typeof window !== 'undefined') localStorage.setItem('admin_token', token);
      },

      login: async (email, password, rememberMe = false) => {
        const { data } = await api.post('/auth/login', { email, password, rememberMe });
        const { accessToken, refreshToken, user } = data.data;
        get().setToken(accessToken);
        if (typeof window !== 'undefined') {
          if (refreshToken) localStorage.setItem('admin_refresh_token', refreshToken);
          else localStorage.removeItem('admin_refresh_token');
        }
        set({ user });
      },

      logout: async () => {
        try { await api.post('/auth/logout'); } catch {}
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_refresh_token');
          window.location.href = '/login';
        }
      },

      fetchMe: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.data, loading: false });
        } catch {
          set({ user: null, token: null, loading: false });
        }
      },
    }),
    { name: 'arjunos-auth', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);
