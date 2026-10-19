// ─── Auth Service ─────────────────────────────────────────────────────────────
import apiClient from './api-client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  AuthTokens,
  UserDTO,
} from '@/types/auth.types';

const AUTH_PREFIX = '/auth';

export const authService = {
  /**
   * Authenticate user and receive JWT tokens.
   */
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`${AUTH_PREFIX}/login`, payload);
    return data;
  },

  /**
   * Register a new ROLE_CUSTOMER account.
   */
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`${AUTH_PREFIX}/register`, payload);
    return data;
  },

  /**
   * Rotate access / refresh token pair.
   */
  async refreshToken(payload: RefreshTokenRequest): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>(`${AUTH_PREFIX}/refresh`, payload);
    return data;
  },

  /**
   * Invalidate the current session server-side.
   */
  async logout(refreshToken: string): Promise<void> {
    await apiClient.post(`${AUTH_PREFIX}/logout`, { refreshToken });
  },

  /**
   * Fetch the authenticated user's profile.
   */
  async getMe(): Promise<UserDTO> {
    const { data } = await apiClient.get<UserDTO>(`${AUTH_PREFIX}/me`);
    return data;
  },

  /**
   * Update the authenticated user's profile.
   */
  async updateProfile(payload: Partial<Pick<UserDTO, 'fullName' | 'phone' | 'cccd'>>): Promise<UserDTO> {
    const { data } = await apiClient.patch<UserDTO>(`${AUTH_PREFIX}/me`, payload);
    return data;
  },

  /**
   * Change password (requires current password for verification).
   */
  async changePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await apiClient.post(`${AUTH_PREFIX}/me/change-password`, payload);
  },
};
