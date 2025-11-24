import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";
import { Button } from "./button";
import { Info } from "lucide-react";
import { AssetsProps } from "@/domain/types/assets/AssetsProps";

export function ActionsCell({ asset }: { asset: AssetsProps }) {
  const { openDrawer } = useAssetDrawerStore();
  const { setSelectedAsset } = useSelectedAssetStore();

  return (
    <Button
      className="ml-4"
      style={{ color: "#002177" }}
      size="default"
      variant="outline"
      onClick={(e) => {
        e.stopPropagation();
        openDrawer(asset);
        setSelectedAsset(asset);
      }}
    >
      <Info />
    </Button>
  );
}
