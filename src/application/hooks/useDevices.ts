"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevice, getDevices } from "../services/api";
import { DeviceProps } from "@/domain/types/device/DeviceProps";

export function useDevices(params?: { filters?: Record<string, unknown> }) {
  return useQuery<DeviceProps[]>({
    queryKey: ["devices", params?.filters],
    queryFn: () => getDevices(params?.filters),
    staleTime: 1000 * 60 * 5,
  });
}
