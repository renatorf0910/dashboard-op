"use client";
import React, { useState, useMemo } from 'react'
import AssetsDataTable from "@/components/ui/assets/assets-data-table";
import { AssetsProps, AssetsForm } from "@/domain/types/assets/AssetsProps";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer"
import { TypographyKey } from '@/components/ui/typographyKey';
import { useAssets } from '@/application/hooks/useAssets';
import { TableSkeleton } from '@/components/ui/tableSkeleton';
import { ErrorBoundary } from '@/components/error/errorBoundary';
import { SearchFormDrawer } from '@/components/forms/searchFormDrawer';
import { SearchFormFields } from '@/domain/types/form/SearchFormProps';
import { ListFilterPlus } from 'lucide-react';
import { useVulnerabilities } from '@/application/hooks/useVulnerabilities';
import { AssetDetailsDrawer } from '@/components/ui/assets/assetDetailsDrawer';

function AssetsPage() {
  const initialValue: AssetsForm = {
    name: "",
    location: "",
    risk: "",
    supplier: "",
  };
  const [selectedAsset, setSelectedAsset] = useState<AssetsProps | null>(null);
  const [openInfos, setOpenInfos] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [filters, setFilters] = useState<AssetsForm>(initialValue);

  const { data: assets, isLoading, refetch } = useAssets();
  const { data: vulnerabilities, isLoading: isLoadingVulns } = useVulnerabilities(selectedAsset?.id);


  const filteredAssets = useMemo(() => {
    if (!assets) return [];
    return assets.filter(asset =>
      (!filters.name || asset.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.location || asset.location === filters.location) &&
      (!filters.risk || asset.risk === filters.risk) &&
      (!filters.supplier || asset.supplier.toLowerCase().includes(filters.supplier.toLowerCase()))
    );
  }, [assets, filters]);

  const clearFilters = () => {
    setFilters(initialValue);
  };

  const searchFields: SearchFormFields<AssetsForm>[] = useMemo(() => {
    if (!assets) return [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "select", options: [] },
      { name: "risk", label: "Risk", type: "select", options: [] },
      { name: "supplier", label: "Supplier", type: "text" },
    ];

    const getUniqueOptions = (key: keyof AssetsForm) =>
      Array.from(new Set(assets.map(a => a[key as keyof AssetsProps] as string).filter(Boolean)))
        .map(v => ({ label: v, value: v }));

    return [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "select", options: getUniqueOptions("location") },
      { name: "risk", label: "Risk", type: "select", options: getUniqueOptions("risk") },
      { name: "supplier", label: "Supplier", type: "text" },
    ];
  }, [assets]);

  const handleRowClick = (asset: AssetsProps) => {
    setSelectedAsset(asset);
    setOpenInfos(true);
  }

  if (isLoading) return <><TableSkeleton /></>

  return (
    <>
      <div className="flex mb-4">
        <button className='ml-auto'
          onClick={() => setOpenSearchDrawer(true)}
        >
          <ListFilterPlus />
        </button>
      </div>
      <SearchFormDrawer
        title="Filter Assets"
        open={openSearchDrawer}
        onOpenChange={setOpenSearchDrawer}
        fields={searchFields}
        initialValues={filters}
        onSubmit={(values) => {
          setFilters(values);
          setOpenSearchDrawer(false);
        }}
        onClear={clearFilters}
      />
      <ErrorBoundary fallback={"Error to loading table"}>
        <AssetsDataTable assets={filteredAssets} selectedRow={handleRowClick} />
      </ErrorBoundary>
      <ErrorBoundary fallback={"Error to loading details"}>
        <AssetDetailsDrawer
          open={openInfos}
          onOpenChange={setOpenInfos}
          asset={selectedAsset}
          vulnerabilities={vulnerabilities}
          isLoading={isLoadingVulns}
        />
      </ErrorBoundary>
    </>
  )
}

export default AssetsPage;