import { create } from "zustand";

export const useFilterStore = create<FilterProps>((set) => ({
  filters: {},

  setFilters: (key, f) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: { ...state.filters[key], ...f },
      },
    })),

  clearFilters: (key) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: {},
      },
    })),
}));
