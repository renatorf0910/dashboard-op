"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useFilterDrawerStore } from "@/application/store/useFilterDrawerStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";

import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import { Notes } from "@/components/notes/notes";
import { AssetDetailsDrawer } from "@/components/ui/assets/assetDetailsDrawer";
import AssetsDataTable from "@/components/ui/assets/assetsDataTable";
import { ErrorState } from "@/components/ui/errorState";
import { getLocationLabel } from "@/components/ui/location-badge";
import { SkeletonTable } from "@/components/ui/table-skeleton";

import { AssetsFilterForm, AssetsProps, AssetsQueryParams } from "@/domain/types/assets/AssetsProps";
import { FilterGroup } from "@/domain/types/filters/FIlterProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";

const defaultAssetFilters: AssetsFilterForm = { name: "", risk: "", location: "", supplier: "" };

function AssetsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const urlAssetId = params?.id ? String(params.id) : null;

  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const clearFilters = useFilterStore((s) => s.clearFilters);
  const filtersApplied = useFilterStore((s) => s.hasFilters(FilterGroup.Assets));
  const assetFilters = (filters[FilterGroup.Assets] ?? {}) as AssetsFilterForm;

  const { isOpen: isFilterOpen, open, close } = useFilterDrawerStore();

  const [page, setPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    const urlFilters: Partial<AssetsFilterForm> = {
      name: searchParams.get("name") || "",
      risk: searchParams.get("risk") || "",
      location: searchParams.get("location") || "",
      supplier: searchParams.get("supplier") || "",
    };
    const urlPage = parseInt(searchParams.get("page") || "1", 10);

    setFilters(FilterGroup.Assets, urlFilters);
    setPage(urlPage);

  }, []);

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
    return Object.keys(assetFilters).length === 0 ? defaultAssetFilters : assetFilters;
  }, [assetFilters]);

  const { assets: assetsData, isLoadingAssets, isErrorAssets, errorAssets } = useAssets(queryParams);
  const { assets: allAssetsData } = useAssets({
    page: 1,
    pageSize: 40,
    filters: {},
  });

  const { assetButtonDevices, setAssetButtonDevices, selectedAsset, selectedId, setSelectedAsset } = useSelectedAssetStore();
  const { asset, isOpen, openDrawer, closeDrawer } = useAssetDrawerStore();

  const assets = assetsData?.items ?? [];
  const total = assetsData?.total ?? 0;

  const allAssetsRef = useRef<AssetsProps[] | null>(null);
  const sourceForOptions = allAssetsData?.items ?? assets;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const riskOptions = useMemo(() => Array.from(new Set(sourceForOptions.map((a) => a.risk))).filter(Boolean).map((v) => ({ label: capitalize(v), value: v })), [sourceForOptions]);

  const locationOptions = useMemo(() => Array.from(new Set(sourceForOptions.map((a) => a.location))).filter(Boolean).map((loc) => ({ label: getLocationLabel(loc), value: loc })), [sourceForOptions]);

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
    supplier: Yup.string().optional().max(50),
  });

  useEffect(() => {
    if (!allAssetsRef.current && assetsData?.items) {
      allAssetsRef.current = assetsData.items;
    }
  }, [assetsData]);

  if (isErrorAssets) {
    return <ErrorState message="Error to loading Assets." onRetry={() => router.refresh()} details={errorAssets?.message} />;
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
    router.push(`/assets/${asset.id}?${searchParams.toString()}`);
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
      if (asset) router.push(`/assets/${asset.id}?${searchParams.toString()}`);
      openDrawer(asset!);
    } else {
      router.push(`/assets?${searchParams.toString()}`);
      closeDrawer();
    }
  };

  const resetFilters = () => {
    clearFilters(FilterGroup.Assets);
    setPage(1);
    router.replace(`/assets`);
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
            const query = new URLSearchParams();
            Object.entries(values).forEach(([key, value]) => value && query.set(key, String(value)));
            query.set("page", "1");
            router.replace(`/assets?${query.toString()}`);
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
              onPageChange={(p) => {
                setPage(p);
                const query = new URLSearchParams();
                Object.entries(assetFilters).forEach(([key, value]) => value && query.set(key, String(value)));
                query.set("page", String(p));
                router.replace(`/assets?${query.toString()}`);
              }}
              onClearFilters={resetFilters}
            />
          </div>
        </div>
      </ErrorBoundary>
      <ErrorBoundary fallback="Error loading Details">
        <AssetDetailsDrawer open={isOpen} onOpenChange={handleDrawerChange} asset={asset}>
          {selectedAsset && <Notes assetId={selectedAsset.id} />}
        </AssetDetailsDrawer>
      </ErrorBoundary>
    </div>
  );
}

export default AssetsPage;
