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

export interface DeviceStore {
  selectedDeviceId?: string;
  setSelectedDeviceId: (id?: string) => void;
  clearSelectedDevice: () => void;
};

export type DeviceDrawerStore = {
  device: DeviceProps | null;
  isOpen: boolean;
  openDrawer: (device: DeviceProps) => void;
  closeDrawer: () => void;
};
