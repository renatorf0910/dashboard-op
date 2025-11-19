import { SidebarStore } from "@/domain/types/sideBar/SideBarItemsProps";
import { create } from "zustand";

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
