"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AssetsProps } from "@/domain/types/assets/AssetsProps";
import { getAssets } from '@/application/services/api';
import React, { useEffect, useState } from 'react'

function AssetsPage() {
  const [assets, setAssets] = useState<AssetsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.log("Err get Assets");
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, [])
  console.log(assets)
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>RiskScore</TableHead>
            <TableHead>Supplier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>{asset.risk}</TableCell>
              <TableCell>{asset.riskScore}</TableCell>
              <TableCell>{asset.supplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AssetsPage;