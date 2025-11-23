import { VulnerabilitiesStoreProps, VulnerabilityProps } from "@/domain/types/vulnerability/VulnerabilityProps";
import { useQuery } from "@tanstack/react-query";
import { getVulnerabilitiesByAssetId } from "../services/api";

export function useVulnerabilities(assetId: string | null): VulnerabilitiesStoreProps {
  const query = useQuery<VulnerabilityProps[]>({
    queryKey: ["vulnerabilities", assetId],
    queryFn: () => {
      if (!assetId) return Promise.resolve([]);
      return getVulnerabilitiesByAssetId(assetId);
    },
    enabled: !!assetId,
  });
  return {
    vulnerabilities: query.data,
    isLoadingVulnerabilities: query.isLoading,
    errorVulnerabilities: query.error,
    isErrorVulnerabilities: query.isError,
  };
}
