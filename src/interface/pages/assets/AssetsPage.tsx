"use client";
import { getAssets } from '@/application/services/api';
import React, { useEffect, useState } from 'react'
import AssetsDataTable from "@/components/ui/assets/assets-data-table";
import { Assets } from "@/domain/types/assets/AssetsProps";

function AssetsPage() {
  const [assets, setAssets] = useState<Assets[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <AssetsDataTable assets={assets}/>
  )
}

export default AssetsPage;