import { AssetsProps } from "../assets/AssetsProps";

export interface AssetDrawerStoreProps {
  isOpen: boolean;
  asset: AssetsProps | null;
  openDrawer: (asset: AssetsProps) => void;
  closeDrawer: () => void;
  reset: () => void;
}