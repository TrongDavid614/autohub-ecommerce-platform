// ─── Car Compare Store ────────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CarVariant } from '@/types/car.types';

/** Maximum number of variants that can be compared simultaneously */
export const MAX_COMPARE_SLOTS = 3 as const;

interface CompareState {
  slots: (CarVariant | null)[];   // always length MAX_COMPARE_SLOTS

  // ── Mutations ────────────────────────────────────────────────────────────────
  addToCompare: (variant: CarVariant) => boolean;
  removeFromCompare: (variantId: string) => void;
  clearCompare: () => void;

  // ── Derived ──────────────────────────────────────────────────────────────────
  isInCompare: (variantId: string) => boolean;
  filledSlots: () => CarVariant[];
  hasAvailableSlot: () => boolean;
}

const emptySlots = (): null[] => Array(MAX_COMPARE_SLOTS).fill(null);

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      slots: emptySlots(),

      addToCompare: (variant) => {
        const { slots, isInCompare } = get();

        if (isInCompare(variant.id)) return false; // already in compare

        const emptyIdx = slots.findIndex((s) => s === null);
        if (emptyIdx === -1) return false; // no free slot

        const updated = [...slots];
        updated[emptyIdx] = variant;
        set({ slots: updated });
        return true;
      },

      removeFromCompare: (variantId) => {
        const updated = get().slots.map((s) =>
          s?.id === variantId ? null : s,
        );
        set({ slots: updated });
      },

      clearCompare: () => set({ slots: emptySlots() }),

      isInCompare: (variantId) =>
        get().slots.some((s) => s?.id === variantId),

      filledSlots: () =>
        get().slots.filter((s): s is CarVariant => s !== null),

      hasAvailableSlot: () => get().slots.some((s) => s === null),
    }),
    {
      name: 'compare-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ slots: state.slots }),
    },
  ),
);
