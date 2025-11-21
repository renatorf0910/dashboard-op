"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";
import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";
import { useFilterStore } from "@/application/store/useFilterStore";

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

import { useParams, useRouter } from "next/navigation";
import { TypographyTitle } from "@/components/ui/typograph-title";

function AssetsPage({ id }: AssetsPageProps) {
  const router = useRouter();
  const params = useParams();

  const urlAssetId = params?.id ? String(params.id) : null;

  const { filters, setFilters, clearFilters } = useFilterStore();
  const assetFilters = (filters["assets"] ?? {}) as AssetsFilterForm;

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

  const { data, isLoading } = useAssets(queryParams);
  const { assetButtonDevices, setAssetButtonDevices, selectedAsset, selectedId, setSelectedAsset } = useSelectedAssetStore();
  const { vulnerabilities, loadingVulnerabilities } = useVulnerabilities(selectedId);
  const { asset, isOpen, openDrawer, closeDrawer, setVulnerabilities, setIsLoadingVulns, } = useAssetDrawerStore();

  const assets = data?.items ?? [];
  const total = data?.total ?? 0;

  const allAssetsRef = useRef<AssetsProps[] | null>(null);
  const sourceForOptions = allAssetsRef.current ?? assets;

  const searchFields: SearchFormFields<AssetsFilterForm>[] = useMemo(() => {
    const getUnique = (key: keyof AssetsProps) =>
      Array.from(new Set(sourceForOptions.map((a) => a[key] as string)))
        .filter(Boolean)
        .map((v) => ({ label: v, value: v }));

    return [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "select", options: getUnique("location") },
      { name: "risk", label: "Risk", type: "select", options: getUnique("risk") },
      { name: "supplier", label: "Supplier", type: "text" },
    ];
  }, [sourceForOptions]);

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
    clearFilters("assets");
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
          initialValues={assetFilters}
          onSubmit={(values) => {
            setFilters("assets", values);
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
