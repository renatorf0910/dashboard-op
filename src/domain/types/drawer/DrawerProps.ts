import { AssetsProps } from "../assets/AssetsProps";
import { VulnerabilityProps } from "../vulnerability/VulnerabilityProps";

export interface AssetDrawerStoreProps {
  isOpen: boolean;
  asset: AssetsProps | null;
  vulnerabilities: VulnerabilityProps[];
  isLoadingVulns: boolean;

  openDrawer: (asset: AssetsProps) => void;
  closeDrawer: () => void;

  setVulnerabilities: (v: VulnerabilityProps[]) => void;
  setIsLoadingVulns: (loading: boolean) => void;

  reset: () => void;
}