import { VulnerabilityProps } from "../vulnerability/VulnerabilityProps";

export interface AssetsProps {
    id: string,
    name: string,
    location: string,
    risk: string,
    riskScore: number,
    supplier: string,
}

export interface AssetsForm {
  name: string | null;
  location: string | null;
  risk: string | null;
  supplier: string | null;
}

export interface AssetDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: AssetsProps | null;
  vulnerabilities?: VulnerabilityProps[];
  isLoading?: boolean;
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
