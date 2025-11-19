import { DeviceDrawerStore } from "@/domain/types/device/DeviceProps";
import { create } from "zustand";

export const useDeviceStore = create<DeviceDrawerStore>((set) => ({
  device: null,
  isOpen: false,

  openDrawer: (device) => set({ device, isOpen: true }),
  closeDrawer: () => set({ device: null, isOpen: false }),
}));
