import { BaseEntity } from "../topology/TopologyProps";

export interface DeviceProps {
  id: string;
  assetId: string;
  gatewayId: string;
  name: string;
  type: string;
};

export interface Device extends BaseEntity {
  gatewayId: string;
}
