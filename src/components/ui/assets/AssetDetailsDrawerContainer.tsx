"use client";

import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { AssetDetailsDrawer } from "./assetDetailsDrawer";
import { Notes } from "@/components/notes/notes";

export function AssetDetailsDrawerContainer() {
  const { isOpen, asset, closeDrawer } = useAssetDrawerStore();

  return (
    <AssetDetailsDrawer
      open={isOpen}
      onOpenChange={(state) => !state && closeDrawer()}
      asset={asset}
    >
      {asset && (
        <Notes assetId={asset.id} />
      )}
    </AssetDetailsDrawer>
  );
}
