"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../services/api";
import { AssetsQueryParams, PaginatedAssetsResponse } from "@/domain/types/assets/AssetsProps";

export const useAssets = (params: AssetsQueryParams) => {
  return useQuery<PaginatedAssetsResponse, Error>({
    queryKey: ["assets", params.page, params.pageSize, params.filters],
    queryFn: () => getAssets(params),
    staleTime: 10 * 1000,
    placeholderData: (prev) => prev,
  });
};
