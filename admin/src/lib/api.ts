import axios from 'axios';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';
const API_URL = rawApiUrl.replace(/\/$/, '').endsWith('/api/v1')
  ? rawApiUrl.replace(/\/$/, '')
  : `${rawApiUrl.replace(/\/$/, '')}/api/v1`;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('admin_refresh_token') : null;
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          refreshToken ? { refreshToken } : {},
          { withCredentials: true }
        );
        const token = data.data?.accessToken;
        if (token) {
          localStorage.setItem('admin_token', token);
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        }
      } catch {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh_token');
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
