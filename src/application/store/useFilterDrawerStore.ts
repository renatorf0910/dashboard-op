import { FilterDrawerState } from "@/domain/types/filters/FIlterProps";
import { create } from "zustand";

export const useFilterDrawerStore = create<FilterDrawerState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
