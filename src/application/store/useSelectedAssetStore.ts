import { create } from "zustand";
import { AssetsProps } from "@/domain/types/assets/AssetsProps";

interface SelectedAssetStore {
  selectedId: string | null;
  selectedAsset: AssetsProps | null;
  assetButtonDevices: string | null;

  setSelectedAsset: (a: AssetsProps) => void;
  setSelectedId: (id: string | null) => void;
  setAssetButtonDevices: (id: string | null) => void;
}

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
