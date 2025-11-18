"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevice, getDevices } from "../services/api";
import { DeviceProps } from "@/domain/types/device/DeviceProps";

export function useDevices() {
  return useQuery<DeviceProps[]>({
    queryKey: ["devices"],
    queryFn: getDevices,
    staleTime: 1000 * 60 * 5,
  });
}
