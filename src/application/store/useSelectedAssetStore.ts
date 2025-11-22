import { create } from "zustand";
import { SelectedAssetStore } from "@/domain/types/assets/AssetsProps";

export const useSelectedAssetStore = create<SelectedAssetStore>((set) => ({
  selectedId: null,
  selectedAsset: null,
  assetButtonDevices: null,

  setSelectedAsset: (asset) =>
    set({ selectedAsset: asset, selectedId: asset.id }),

  setSelectedId: (id) =>
    set({ selectedId: id }),

  setAssetButtonDevices: (id) =>
    set({ assetButtonDevices: id }),
}));
