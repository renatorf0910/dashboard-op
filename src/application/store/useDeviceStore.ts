import { DeviceStore } from "@/domain/types/device/DeviceProps";
import { create } from "zustand";


export const useDeviceStore = create<DeviceStore>((set) => ({
  device: null,
  setDevice: (device) => set({ device }),
  clearDevice: () => set({ device: null }),
}));
