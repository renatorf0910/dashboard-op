import { ReactNode } from "react";
import { VulnerabilityProps } from "../vulnerability/VulnerabilityProps";

export interface AssetsProps {
    id: string,
    name: string,
    location: string,
    risk: string,
    riskScore: number,
    supplier: string,
}

export interface AssetsDataTableProps {
    assets: AssetsProps[];
    total: number;
    page: number;
    onPageChange: (page: number) => void;
    selectedRow: (asset: AssetsProps) => void;
}

export type AssetsDataTableMobileProps = {
  assets: AssetsProps[];
  onSelect: (asset: AssetsProps) => void;
};

export type AssetsFilterForm = Partial<AssetsProps>;

export interface AssetDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: AssetsProps | null;
  vulnerabilities?: VulnerabilityProps[];
  isLoading?: boolean;
  children: ReactNode;
}

export interface SelectedAssetStore {
  selectedId: string | null;
  selectedAsset: AssetsProps | null;
  assetButtonDevices: string | null;

  setSelectedAsset: (a: AssetsProps) => void;
  setSelectedId: (id: string | null) => void;
  setAssetButtonDevices: (id: string | null) => void;
}


export interface AssetsQueryParams {
  page: number;
  pageSize: number;
  filters: {
    name?: string;
    risk?: string;
    supplier?: string;
    location?: string;
  };
}

export interface PaginatedAssetsResponse {
  items: AssetsProps[];
  total: number;
}
