import { create } from "zustand";
import { AssetSelectedStore } from "@/domain/types/assets/AssetsProps";

export const useSelectedAssetStore = create<AssetSelectedStore>((set) => ({
  selectedId: null,
  selectedAsset: null,

  setSelectedAsset: (asset) =>
    set({
      selectedAsset: asset,
      selectedId: asset ? asset.id : null,
    }),

  clear: () =>
    set({
      selectedAsset: null,
      selectedId: null,
    }),
}));
