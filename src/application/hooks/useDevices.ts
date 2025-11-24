"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevice, getDevices } from "../services/api";
import { DeviceProps } from "@/domain/types/device/DeviceProps";

export function useDevices(params?: { filters?: Record<string, unknown> }) {
  const query = useQuery<DeviceProps[]>({
    queryKey: ["devices", params?.filters],
    queryFn: () => getDevices(params?.filters),
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
  return {
    devices: query.data,
    isLoadingVulnerabilities: query.isLoading,
    errorVulnerabilities: query.isError,
  };
}
