// ─── Cart Store (Guest-Persistent) ────────────────────────────────────────────
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Accessory, Cart } from '@/types/accessory.types';
import { accessoryService } from '@/services/accessory.service';

interface CartState {
  items: CartItem[];
  updatedAt: string;

  // ── Mutations ────────────────────────────────────────────────────────────────
  addItem: (accessory: Accessory, quantity?: number) => void;
  removeItem: (accessoryId: string) => void;
  updateQuantity: (accessoryId: string, quantity: number) => void;
  clearCart: () => void;

  // ── Derived ──────────────────────────────────────────────────────────────────
  totalItems: () => number;
  subtotal: () => number;

  // ── Server sync ──────────────────────────────────────────────────────────────
  /** Merge local guest cart with server cart after login */
  mergeCartWithServer: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      updatedAt: new Date().toISOString(),

      addItem: (accessory, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.accessory.id === accessory.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.accessory.id === accessory.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
            updatedAt: new Date().toISOString(),
          });
        } else {
          set({
            items: [
              ...items,
              { accessory, quantity, priceSnapshot: accessory.price },
            ],
            updatedAt: new Date().toISOString(),
          });
        }
      },

      removeItem: (accessoryId) =>
        set({
          items: get().items.filter((i) => i.accessory.id !== accessoryId),
          updatedAt: new Date().toISOString(),
        }),

      updateQuantity: (accessoryId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(accessoryId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.accessory.id === accessoryId ? { ...i, quantity } : i,
          ),
          updatedAt: new Date().toISOString(),
        });
      },

      clearCart: () =>
        set({ items: [], updatedAt: new Date().toISOString() }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + i.priceSnapshot * i.quantity,
          0,
        ),

      mergeCartWithServer: async () => {
        const guestItems = get().items;
        if (guestItems.length === 0) return;
        try {
          const serverCart: Cart = await accessoryService.mergeCarts(guestItems);
          set({
            items: serverCart.items,
            updatedAt: serverCart.updatedAt,
          });
        } catch (err) {
          console.error('[CartStore] Failed to merge cart with server:', err);
        }
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        updatedAt: state.updatedAt,
      }),
    },
  ),
);
