"use client";
import { getAssets } from '@/application/services/api';
import React, { useEffect, useState } from 'react'
import AssetsDataTable from "@/components/ui/assets/assets-data-table";
import { Assets } from "@/domain/types/assets/AssetsProps";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer"
import { TypographyKey } from '@/components/ui/typographyKey';

function AssetsPage() {
  const [assets, setAssets] = useState<Assets[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Assets | null>(null);
  const [openInfos, setOpenInfos] = useState(false);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.log("Err get Assets");
      } finally {
        setLoading(false);
      }
    }

    fetchAssets()
  }, [])

  if (loading) return <p>Loading...</p>

  const handleRowClick = (asset: Assets) => {
    setSelectedAsset(asset);
    setOpenInfos(true);
  }


  return (
    <>
      <AssetsDataTable assets={assets} selectedRow={handleRowClick} />
      <Drawer open={openInfos} onOpenChange={setOpenInfos}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>
              {Object.entries(selectedAsset ?? {}).map(([key, value]) => (
                <TypographyKey key={key} field={`${key}: ${String(value)}`} />
              ))}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default AssetsPage;