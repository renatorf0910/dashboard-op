"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../services/api";
import { AssetsQueryParams, PaginatedAssetsResponse } from "@/domain/types/assets/AssetsProps";

export const useAssets = (params: AssetsQueryParams) => {
  const query = useQuery<PaginatedAssetsResponse, Error>({
    queryKey: ["assets", params.page, params.pageSize, params.filters],
    queryFn: () => getAssets(params),
    staleTime: 10 * 1000,
    placeholderData: (prev) => prev,
  });

  return {
    assets: query.data,
    isLoadingAssets: query.isLoading,
    isErrorAssets: query.isError,
    errorAssets: query.error,
  };
};
