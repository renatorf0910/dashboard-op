"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";
import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";

import { Notes } from "@/components/notes/notes";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import { AssetDetailsDrawer } from "@/components/ui/assets/assetDetailsDrawer";
import AssetsDataTable from "@/components/ui/assets/assetsDataTable";
import { SkeletonTable } from "@/components/ui/table-skeleton";

import { AssetsFilterForm, AssetsProps, AssetsQueryParams } from "@/domain/types/assets/AssetsProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

import { useEffect, useMemo, useRef, useState } from "react";

import { useFilterDrawerStore } from "@/application/store/useFilterDrawerStore";
import { SkeletonCard } from "@/components/ui/card-skeleton";
import { ErrorState } from "@/components/ui/errorState";
import { getLocationLabel } from "@/components/ui/location-badge";
import { FilterGroup } from "@/domain/types/filters/FIlterProps";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";

const defaultAssetFilters: AssetsFilterForm = { name: "", risk: "", location: "", supplier: "" };

function AssetsPage() {
  const router = useRouter();
  const params = useParams();
  const urlAssetId = params?.id ? String(params.id) : null;

  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const clearFilters = useFilterStore((s) => s.clearFilters);
  const filtersApplied = useFilterStore((s) => s.hasFilters(FilterGroup.Assets));

  const assetFilters = (filters[FilterGroup.Assets] ?? {}) as AssetsFilterForm;

  const { isOpen: isFilterOpen, open, close } = useFilterDrawerStore();

  const [page, setPage] = useState(1);
  const pageSize = 100;

  const queryParams: AssetsQueryParams = {
    page,
    pageSize,
    filters: {
      name: assetFilters.name || "",
      risk: assetFilters.risk || "",
      location: assetFilters.location || "",
      supplier: assetFilters.supplier || "",
    },
  };

  const normalizedInitialValues = useMemo(() => {
    return Object.keys(assetFilters).length === 0
      ? defaultAssetFilters
      : assetFilters;
  }, [assetFilters]);

  const {
    assets: assetsData,
    isLoadingAssets,
    isErrorAssets,
    errorAssets,
  } = useAssets(queryParams);

  const { assetButtonDevices, setAssetButtonDevices, selectedAsset, selectedId, setSelectedAsset } = useSelectedAssetStore();

  const { asset, isOpen, openDrawer, closeDrawer } = useAssetDrawerStore();

  const assets = assetsData?.items ?? [];
  const total = assetsData?.total ?? 0;

  const allAssetsRef = useRef<AssetsProps[] | null>(null);
  const sourceForOptions = allAssetsRef.current ?? assets;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const riskOptions = useMemo(() => {
    return Array.from(new Set(sourceForOptions.map((a) => a.risk)))
      .filter(Boolean)
      .map((v) => ({ label: capitalize(v), value: v }));
  }, [sourceForOptions]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(sourceForOptions.map((a) => a.location)))
      .filter(Boolean)
      .map((loc) => ({
        label: getLocationLabel(loc),
        value: loc,
      }));
  }, [sourceForOptions]);

  const searchFields: SearchFormFields<AssetsFilterForm>[] = useMemo(
    () => [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "select", options: locationOptions },
      { name: "risk", label: "Risk", type: "select", options: riskOptions },
      { name: "supplier", label: "Supplier", type: "text" },
    ],
    [sourceForOptions]
  );

  const assetsFilterSchema = Yup.object({
    name: Yup.string().optional().max(50),
    risk: Yup.string().optional(),
    location: Yup.string().optional(),
    supplier: Yup.string().optional().max(50)
  });


  useEffect(() => {
    if (!allAssetsRef.current && assetsData?.items) {
      allAssetsRef.current = assetsData.items;
    }
  }, [assetsData]);

  if (isErrorAssets) {
    return (
      <ErrorState
        message="Error to loading Assets."
        onRetry={() => router.refresh()}
        details={errorAssets?.message}
      />
    );
  }

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

  if (isLoadingAssets) return <SkeletonTable />;

  return (
    <div className="h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] flex flex-col">
      <div className="px-6 py-6 ">
        <h1 className="text-3xl font-bold tracking-tight">Assets Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View available assets, click for more information about each asset.
        </p>
      </div>
      <ErrorBoundary fallback="Error loading Filter">
        <SearchFormDrawer<AssetsFilterForm>
          open={isFilterOpen}
          onOpenChange={(o) => (o ? open() : close())}
          title="Filter Assets"
          fields={searchFields}
          initialValues={normalizedInitialValues}
          validation={assetsFilterSchema}
          filtersApplied={filtersApplied}
          onSubmit={(values) => {
            setFilters(FilterGroup.Assets, values);
            setPage(1);
            close();
          }}
          onClear={() => {
            resetFilters();
            close();
          }}
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
        >
          {selectedAsset && <Notes assetId={selectedAsset.id} />}
        </AssetDetailsDrawer>
      </ErrorBoundary>
    </div>
  );
}

export default AssetsPage;
