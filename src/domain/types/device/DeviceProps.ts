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

export interface DeviceFilterForm {
  name?: string | null;
  type?: string | null;
  assetId?: string | null;
  gatewayId?: string | null;
}
