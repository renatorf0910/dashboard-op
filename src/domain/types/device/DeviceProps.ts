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
  selectedDeviceId?: string;
  setSelectedDeviceId: (id?: string) => void;
  clearSelectedDevice: () => void;
};

export interface DeviceDrawerStore {
  device: (DeviceProps & {
    asset?: AssetsProps | null;
    gateway?: GatewayProps | null;
  }) | null;
  isOpen: boolean;
  openDrawer: (device: DeviceProps & {
    asset?: AssetsProps | null;
    gateway?: GatewayProps | null;
  }) => void;
  closeDrawer: () => void;
}
