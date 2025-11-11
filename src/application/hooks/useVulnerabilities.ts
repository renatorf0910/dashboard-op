import { VulnerabilityProps } from "@/domain/types/vulnerability/VulnerabilityProps";
import { useQuery } from "@tanstack/react-query";
import { getVulnerabilitiesByAssetId } from "../services/api";

export function useVulnerabilities(assetId?: string) {
  return useQuery<VulnerabilityProps[]>({
    queryKey: ["vulnerabilities", assetId],
    queryFn: () => getVulnerabilitiesByAssetId(assetId!),
    enabled: !!assetId,
  });
}
