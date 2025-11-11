import { getTopology } from "@/application/services/api";
import { useQuery } from "@tanstack/react-query";

export function useTopology(assetId?: string) {
  return useQuery({
    queryKey: ["topology", assetId],
    queryFn: () => getTopology(assetId!),
    enabled: !!assetId,
    staleTime: 1000 * 60 * 5,
  });
}