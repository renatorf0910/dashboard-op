"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../services/api";

export function useDevices() {
  return useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
    staleTime: 1000 * 60 * 5,
  });
}
