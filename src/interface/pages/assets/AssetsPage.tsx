"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";
import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";
import { DbApi } from "@/components/db-api/dbApi";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import { AssetDetailsDrawer } from "@/components/ui/assets/assetDetailsDrawer";
import AssetsDataTable from "@/components/ui/assets/assetsDataTable";
import { TableSkeleton } from "@/components/ui/tableSkeleton";
import { AssetsForm, AssetsProps, AssetsQueryParams } from "@/domain/types/assets/AssetsProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";
import { ListFilterPlus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function AssetsPage() {
  const initialFilters: AssetsForm = {
    name: null,
    location: null,
    risk: null,
    supplier: null,
  };
  const pageSize = 20;

  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [filters, setFilters] = useState<AssetsForm>(initialFilters);
  const [page, setPage] = useState<number>(1);

  const queryParams: AssetsQueryParams = {
    page,
    pageSize,
    filters: {
      name: filters.name ?? undefined,
      risk: filters.risk ?? undefined,
      location: filters.location ?? undefined,
      supplier: filters.supplier ?? undefined,
    },
  };
  const { data, isLoading } = useAssets(queryParams);
  const { selectedAsset, selectedId, setSelectedAsset } = useSelectedAssetStore();
  const { vulnerabilities, loadingVulnerabilities } = useVulnerabilities(selectedId);
  const { asset, isOpen, openDrawer, closeDrawer, setVulnerabilities, setIsLoadingVulns } = useAssetDrawerStore();


  const assets = data?.items ?? [];
  const total = data?.total ?? 0;

  const allAssetsRef = useRef<AssetsProps[] | null>(null);
  const sourceForOptions = allAssetsRef.current ?? assets;

  const searchFields: SearchFormFields<AssetsForm>[] = useMemo(() => {
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
    if (!asset) return;
    setIsLoadingVulns(true);

    if (selectedId) {
      setIsLoadingVulns(loadingVulnerabilities);
      setVulnerabilities(vulnerabilities ?? []);
    }
  }, [asset, selectedId, vulnerabilities, loadingVulnerabilities]);



  const handleRowClick = (asset: AssetsProps) => {
    setSelectedAsset(asset);
    openDrawer(asset);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col">

      <div className="flex mb-4">
        <button
          className="ml-auto"
          aria-label="open-filters"
          onClick={() => setOpenSearchDrawer(true)}
        >
          <ListFilterPlus />
        </button>
      </div>

      <ErrorBoundary fallback="Error loading Filter">
        <SearchFormDrawer
          title="Filter Assets"
          open={openSearchDrawer}
          onOpenChange={setOpenSearchDrawer}
          fields={searchFields}
          initialValues={filters}
          onSubmit={(values) => {
            setFilters(values);
            setPage(1);
            setOpenSearchDrawer(false);
          }}
          onClear={clearFilters}
        />
      </ErrorBoundary>

      <ErrorBoundary fallback="Error loading Table">
        <div className="h-[calc(100vh-var(--header-height))] flex flex-col">
          <AssetsDataTable
            assets={assets}
            selectedRow={handleRowClick}
            total={total}
            page={page}
            onPageChange={setPage}
          />
        </div>
      </ErrorBoundary>


      <ErrorBoundary fallback="Error loading Details">
        <AssetDetailsDrawer
          open={isOpen}
          onOpenChange={(o) => (o ? openDrawer(asset!) : closeDrawer())}
          asset={asset}
          vulnerabilities={vulnerabilities}
          isLoading={loadingVulnerabilities}>
          {selectedAsset && <DbApi assetId={selectedAsset.id} />}
        </AssetDetailsDrawer>
      </ErrorBoundary>
    </div>
  );
}

export default AssetsPage;
