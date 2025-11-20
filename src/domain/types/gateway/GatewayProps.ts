import { BaseEntity } from "../topology/TopologyProps";

export interface GatewayProps {
  id: string;
  name: string;
  assetId: string;
}

export interface Gateway extends BaseEntity {
  siteId?: string;
}
