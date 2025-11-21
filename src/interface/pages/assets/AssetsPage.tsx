"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";
import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";

import { DbApi } from "@/components/db-api/dbApi";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import { AssetDetailsDrawer } from "@/components/ui/assets/assetDetailsDrawer";
import AssetsDataTable from "@/components/ui/assets/assetsDataTable";
import { Button } from "@/components/ui/button";
import { TableSkeleton } from "@/components/ui/table-skeleton";

import { AssetsFilterForm, AssetsPageProps, AssetsProps, AssetsQueryParams, } from "@/domain/types/assets/AssetsProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

import { ListFilterPlus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { getLocationLabel } from "@/components/ui/location-badge";
import { TypographyTitle } from "@/components/ui/typograph-title";
import { FilterGroup } from "@/domain/types/filters/FIlterProps";
import { useParams, useRouter } from "next/navigation";

const defaultAssetFilters: AssetsFilterForm = {
  name: "",
  risk: "",
  location: "",
  supplier: ""
};

function AssetsPage({ id }: AssetsPageProps) {
  const router = useRouter();
  const params = useParams();
  const urlAssetId = params?.id ? String(params.id) : null;

  const filters = useFilterStore(s => s.filters);
  const setFilters = useFilterStore(s => s.setFilters);
  const clearFilters = useFilterStore(s => s.clearFilters);
  const filtersApplied = useFilterStore(s => s.hasFilters(FilterGroup.Assets));

  const assetFilters = (filters[FilterGroup.Assets] ?? {}) as AssetsFilterForm;

  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 100;

  const queryParams: AssetsQueryParams = {
    page,
    pageSize,
    filters: {
      name: assetFilters.name || "",
      risk: assetFilters.risk || "",
      location: assetFilters.location || "",
      supplier: assetFilters.supplier || ""
    },
  };

  const normalizedInitialValues = useMemo(() => {
    return Object.keys(assetFilters).length === 0
      ? defaultAssetFilters
      : assetFilters;
  }, [assetFilters]);


  const { data, isLoading } = useAssets(queryParams);
  const { assetButtonDevices, setAssetButtonDevices, selectedAsset, selectedId, setSelectedAsset } = useSelectedAssetStore();
  const { vulnerabilities, loadingVulnerabilities } = useVulnerabilities(selectedId);
  const { asset, isOpen, openDrawer, closeDrawer, setVulnerabilities, setIsLoadingVulns, } = useAssetDrawerStore();

  const assets = data?.items ?? [];
  const total = data?.total ?? 0;

  const allAssetsRef = useRef<AssetsProps[] | null>(null);
  const sourceForOptions = allAssetsRef.current ?? assets;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const getRiskOptions = () =>
    Array.from(new Set(sourceForOptions.map(a => a.risk)))
      .filter(Boolean)
      .map(v => ({ label: capitalize(v), value: v }));

  const riskOptions = useMemo(() => {
    return getRiskOptions();
  }, [sourceForOptions]);


  const locationOptions = useMemo(() => {
    const locs = Array.from(new Set(sourceForOptions.map(a => a.location)))
      .filter(Boolean);

    return locs.map(loc => ({
      label: getLocationLabel(loc),
      value: loc,
    }));
  }, [sourceForOptions]);

  const searchFields: SearchFormFields<AssetsFilterForm>[] = useMemo(() => [
    { name: "name", label: "Name", type: "text" },
    { name: "location", label: "Location", type: "select", options: locationOptions },
    { name: "risk", label: "Risk", type: "select", options: riskOptions },
    { name: "supplier", label: "Supplier", type: "text" },
  ], [sourceForOptions]);


  useEffect(() => {
    if (!allAssetsRef.current && data?.items) {
      allAssetsRef.current = data.items;
    }
  }, [data]);

  useEffect(() => {
    if (assetButtonDevices && assets.length > 0) {
      const asset = assets.find((a) => a.id === assetButtonDevices);
      if (asset) {
        setSelectedAsset(asset);
        openDrawer(asset);
      }
      setAssetButtonDevices(null);
    }
  }, [assetButtonDevices, assets]);

  useEffect(() => {
    if (!asset) return;
    setIsLoadingVulns(true);

    if (selectedId) {
      setIsLoadingVulns(loadingVulnerabilities);
      setVulnerabilities(vulnerabilities ?? []);
    }
  }, [asset, selectedId, vulnerabilities, loadingVulnerabilities]);

  const handleRowClick = (asset: AssetsProps) => {
    setSelectedAsset(asset);
    router.push(`/assets/${asset.id}`);
  };

  useEffect(() => {
    if (!urlAssetId || assets.length === 0) return;

    const found = assets.find((a) => String(a.id) === urlAssetId);
    if (found) {
      setSelectedAsset(found);
      openDrawer(found);
    }
  }, [urlAssetId, assets]);

  const handleDrawerChange = (open: boolean) => {
    if (open) {
      if (asset) router.push(`/assets/${asset.id}`);
      openDrawer(asset!);
    } else {
      router.push(`/assets`);
      closeDrawer();
    }
  };

  const resetFilters = () => {
    clearFilters(FilterGroup.Assets);
    setPage(1);
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <TypographyTitle field="Assets" />
        <Button
          className="cursor-pointer mt-1.5"
          aria-label="open-filters"
          onClick={() => setOpenSearchDrawer(true)}
        >
          <ListFilterPlus />
        </Button>
      </div>

      <ErrorBoundary fallback="Error loading Filter">
        <SearchFormDrawer
          title="Filter Assets"
          open={openSearchDrawer}
          onOpenChange={setOpenSearchDrawer}
          fields={searchFields}
          filtersApplied={filtersApplied}
          initialValues={normalizedInitialValues}
          onSubmit={(values) => {
            setFilters(FilterGroup.Assets, values);
            setPage(1);
            setOpenSearchDrawer(false);
          }}
          onClear={resetFilters}
        />
      </ErrorBoundary>

      <ErrorBoundary fallback="Error loading Table Assets">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto">
            <AssetsDataTable
              assets={assets}
              selectedRow={handleRowClick}
              total={total}
              page={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </ErrorBoundary>

      <ErrorBoundary fallback="Error loading Details">
        <AssetDetailsDrawer
          open={isOpen}
          onOpenChange={handleDrawerChange}
          asset={asset}
          vulnerabilities={vulnerabilities}
          isLoading={loadingVulnerabilities}
        >
          {selectedAsset && <DbApi assetId={selectedAsset.id} />}
        </AssetDetailsDrawer>
      </ErrorBoundary>
    </div>
  );
}

export default AssetsPage;
