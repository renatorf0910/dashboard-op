import { AssetDrawerStoreProps } from "@/domain/types/drawer/DrawerProps";
import { create } from "zustand";

export const useAssetDrawerStore = create<AssetDrawerStoreProps>((set) => ({
  isOpen: false,
  asset: null,
  vulnerabilities: [],
  isLoadingVulns: false,

  openDrawer: (asset) => set({ isOpen: true, asset }),
  closeDrawer: () =>
    set({ isOpen: false, asset: null, vulnerabilities: [] }),

  setVulnerabilities: (v) => set({ vulnerabilities: v }),
  setIsLoadingVulns: (loading) => set({ isLoadingVulns: loading }),

  reset: () =>
    set({
      isOpen: false,
      asset: null,
      vulnerabilities: [],
      isLoadingVulns: false,
    }),
}));
