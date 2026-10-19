// ─── Auth Store ───────────────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserDTO, AuthTokens, Role } from '@/types/auth.types';

interface AuthState {
  user: UserDTO | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;

  // ── Mutations ────────────────────────────────────────────────────────────────
  setAuth: (user: UserDTO, tokens: AuthTokens) => void;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;

  // ── Role helpers ─────────────────────────────────────────────────────────────
  hasRole: (role: Role) => boolean;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isCustomer: () => boolean;
  /** True if user is either ROLE_STAFF or ROLE_ADMIN */
  isStaffOrAbove: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      setAuth: (user, tokens) =>
        set({ user, tokens, isAuthenticated: true }),

      setTokens: (tokens) =>
        set({ tokens }),

      clearAuth: () =>
        set({ user: null, tokens: null, isAuthenticated: false }),

      hasRole: (role) => get().user?.role === role,

      isAdmin: () => get().user?.role === 'ROLE_ADMIN',

      isStaff: () => get().user?.role === 'ROLE_STAFF',

      isCustomer: () => get().user?.role === 'ROLE_CUSTOMER',

      isStaffOrAbove: () => {
        const role = get().user?.role;
        return role === 'ROLE_STAFF' || role === 'ROLE_ADMIN';
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist tokens + user (not derived helpers)
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
