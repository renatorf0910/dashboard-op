"use client";
import { useQuery } from '@tanstack/react-query';
import { AssetsProps } from '@/domain/types/assets/AssetsProps';
import { getAssets } from '../services/api';

export const useAssets = () => {
  return useQuery<AssetsProps[], Error>({
    queryKey: ['assets'], 
    queryFn: getAssets,
    staleTime: 5 * 60 * 1000,
  });
};