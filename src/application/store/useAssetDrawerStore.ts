import { AssetDrawerStoreProps } from "@/domain/types/drawer/DrawerProps";
import { create } from "zustand";

export const useAssetDrawerStore = create<AssetDrawerStoreProps>((set) => ({
  isOpen: false,
  asset: null,

  openDrawer: (asset) => set({ isOpen: true, asset }),
  closeDrawer: () =>
    set({ isOpen: false, asset: null }),


  reset: () =>
    set({
      isOpen: false,
      asset: null,
    }),
}));
