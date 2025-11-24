import { AssetsProps } from "../assets/AssetsProps";
import { GatewayProps } from "../gateway/GatewayProps";
import { BaseEntity } from "../topology/TopologyProps";

export interface DeviceProps {
  id: string;
  assetId: string;
  gatewayId: string;
  name: string;
  type: string;
};

export interface DeviceAllInfosProps extends DeviceProps {
  asset: AssetsProps | null;
  gateway: GatewayProps | null;
  onClearFilters?: () => void
}

export interface Device extends BaseEntity {
  gatewayId: string;
}

export interface DeviceStore {
  device: (DeviceProps & {
    asset?: AssetsProps | null;
    gateway?: GatewayProps | null;
  }) | null;
  setDevice: (
    device: DeviceProps & {
      asset?: AssetsProps | null;
      gateway?: GatewayProps | null;
    } | null
  ) => void;
  clearDevice: () => void;
}

export interface DeviceFilterForm extends Record<string, string | undefined> {
  name?: string;
  type?: string;
  assetId?: string;
  gatewayId?: string;
}
