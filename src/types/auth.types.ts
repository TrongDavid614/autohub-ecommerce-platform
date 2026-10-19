// ─── Auth & RBAC Types ────────────────────────────────────────────────────────

export type Role = 'ROLE_CUSTOMER' | 'ROLE_STAFF' | 'ROLE_ADMIN';

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  /** 12-digit Vietnamese CCCD */
  cccd?: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Unix epoch (ms) */
  expiresAt: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  user: UserDTO;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
