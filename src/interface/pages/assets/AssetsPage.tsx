"use client";

import { useAssets } from "@/application/hooks/useAssets";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import { AssetDetailsDrawer } from "@/components/ui/assets/assetDetailsDrawer";
import AssetsDataTable from "@/components/ui/assets/assets-data-table";
import { TableSkeleton } from "@/components/ui/tableSkeleton";
import { AssetsForm, AssetsProps, AssetsQueryParams } from "@/domain/types/assets/AssetsProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";
import { ListFilterPlus } from "lucide-react";
import { useMemo, useState } from "react";

function AssetsPage() {
  const initialFilters: AssetsForm = {
    name: null,
    location: null,
    risk: null,
    supplier: null,
  };

  const [selectedAsset, setSelectedAsset] = useState<AssetsProps | null>(null);
  const [openInfos, setOpenInfos] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

  const [filters, setFilters] = useState<AssetsForm>(initialFilters);

  const [page, setPage] = useState<number>(1);
  const pageSize = 40;

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
  const { data: vulnerabilities, isLoading: loadingVulns } = useVulnerabilities(selectedAsset?.id);

  const assets = data?.items ?? [];
  const total = data?.total ?? 0;

  const searchFields: SearchFormFields<AssetsForm>[] = useMemo(() => {
    if (!data) {
      return [
        { name: "name", label: "Name", type: "text" },
        { name: "location", label: "Location", type: "select", options: [] },
        { name: "risk", label: "Risk", type: "select", options: [] },
        { name: "supplier", label: "Supplier", type: "text" },
      ];
    }

    const getUnique = (key: keyof AssetsProps) =>
      Array.from(new Set(assets.map((a) => a[key] as string)))
        .filter(Boolean)
        .map((v) => ({ label: v, value: v }));

    return [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "select", options: getUnique("location") },
      { name: "risk", label: "Risk", type: "select", options: getUnique("risk") },
      { name: "supplier", label: "Supplier", type: "text" },
    ];
  }, [data, assets]);

  const handleRowClick = (asset: AssetsProps) => {
    setSelectedAsset(asset);
    setOpenInfos(true);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="flex mb-4">
        <button
          className="ml-auto"
          aria-label="open-filters"
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
          setPage(1);
          setOpenSearchDrawer(false);
        }}
        onClear={clearFilters}
      />

      <ErrorBoundary fallback="Error loading table">
        <AssetsDataTable
          assets={assets}
          selectedRow={handleRowClick}
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </ErrorBoundary>

      <ErrorBoundary fallback="Error loading details">
        <AssetDetailsDrawer
          open={openInfos}
          onOpenChange={setOpenInfos}
          asset={selectedAsset}
          vulnerabilities={vulnerabilities}
          isLoading={loadingVulns}
        />
      </ErrorBoundary>
    </>
  );
}

export default AssetsPage;
