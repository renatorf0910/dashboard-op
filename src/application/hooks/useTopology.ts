import { DiagramData } from "@/domain/types/diagram/DiagramProps";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDiagram } from "../services/api";

export function useTopology(): UseQueryResult<DiagramData, Error> {
  return useQuery<DiagramData, Error>({
    queryKey: ["topology"],
    queryFn: getDiagram,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
