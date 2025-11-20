import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../services/api";
import { AssetsProps } from "@/domain/types/assets/AssetsProps";

export function useAllAssets() {
  const query = useQuery<AssetsProps[], Error>({
    queryKey: ["all-assets"],
    queryFn: getAllAssets,
    staleTime: 10 * 1000,
    placeholderData: (prev) => prev,
  });
  return {
    assets: query.data,
    loadingVulnerabilities: query.isLoading,
    errorVulnerabilities: query.isError,
  } 
}
