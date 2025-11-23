"use client";

import { useQuery } from "@tanstack/react-query";
import { getGateways } from "../services/api";
import { GatewayProps } from "@/domain/types/gateway/GatewayProps";

export const useGatewaysStore = () => {
    const query = useQuery<GatewayProps[], Error>({
        queryKey: ["gateways"],
        queryFn: () => getGateways(),
        staleTime: 10 * 1000,
        placeholderData: (prev) => prev,
    });

    return {
        gateways: query.data,
        isLoadingVulnerabilities: query.isLoading,
        errorVulnerabilities: query.isError,
    }
};
