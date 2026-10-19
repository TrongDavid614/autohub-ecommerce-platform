// ─── Axios API Client ─────────────────────────────────────────────────────────
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach Bearer JWT ────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token is read from Zustand store (or cookie fallback for SSR)
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('auth-storage');
        if (raw) {
          const parsed = JSON.parse(raw) as { state?: { tokens?: { accessToken?: string } } };
          token = parsed?.state?.tokens?.accessToken ?? null;
        }
      } catch {
        // Silently ignore parse errors
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: handle 401 / token refresh ─────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const raw = typeof window !== 'undefined'
          ? localStorage.getItem('auth-storage')
          : null;
        const parsed = raw
          ? (JSON.parse(raw) as { state?: { tokens?: { accessToken?: string; refreshToken?: string } } })
          : null;
        const refreshToken = parsed?.state?.tokens?.refreshToken;

        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
        );

        // Persist new access token
        if (parsed?.state?.tokens && raw) {
          parsed.state.tokens.accessToken = data.accessToken;
          parsed.state.tokens.refreshToken = data.refreshToken;
          localStorage.setItem('auth-storage', JSON.stringify(parsed));
        }

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        // Refresh failed → clear auth state and redirect
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
