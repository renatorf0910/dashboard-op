"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { TypographyKey } from "@/components/ui/typography-key";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { AssetDetailsDrawerProps } from "@/domain/types/assets/AssetsProps";
import { motion } from "framer-motion";
import { TypographyBlurred } from "../typography-blurred";
import { SkeletonCard } from "../card-skeleton";

export function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  vulnerabilities = [],
  isLoading = false,
  children,
}: AssetDetailsDrawerProps) {

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <Badge className="bg-red-700 text-white px-3 py-1 rounded-md shadow">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-500 text-white px-3 py-1 rounded-md shadow">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500 text-white px-3 py-1 rounded-md shadow">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-200/20 text-red-400 font-semibold">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-600 font-semibold">Medium Risk</Badge>;
      case "low":
        return <Badge className="bg-green-500/20 text-green-600 font-semibold">Low Risk</Badge>;
      default:
        return <Badge className="bg-red-900/20 text-red-900 font-semibold">Critical</Badge>;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <ErrorBoundary fallback={"Error to render content"}>
          <div className="p-6 overflow-y-auto space-y-10 max-h-screen bg-linear-to-b from-gray-50 to-white">
            {asset ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-gray-800">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h2 className="text-xl font-semibold">{asset.name}</h2>
                </div>

                <div className="flex gap-2 flex-wrap text-sm">
                  {getRiskBadge(asset.risk)}
                  <Badge variant="outline">Supplier: {asset.supplier}</Badge>
                  <Badge variant="outline">Location: {asset.location}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                  {Object.entries(asset).map(([key, value]) => (
                    <TypographyKey key={key} field={`${key}: ${String(value)}`} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <p className="text-muted-foreground text-sm text-center">
                No asset selected.
              </p>
            )}
            <Separator />
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Vulnerabilities
              </h4>

              {isLoading && <SkeletonCard />}

              {!isLoading && vulnerabilities.length === 0 && (
                <SkeletonCard />
              )}

              {!isLoading && vulnerabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  {vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className="p-4 flex justify-between items-start transition"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-800">
                            {vuln.title}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 flex flex-col gap-0.5">
                          <TypographyBlurred field={`Scope: ${vuln.scope}`} />
                          <TypographyBlurred field={`Ref ID: ${vuln.refId}`} />
                          <TypographyBlurred field={`CVSS: ${vuln.cvss}`} />
                          <TypographyBlurred field={`Acknowledged: ${vuln.acknowledged ? "✅" : "❌"}`} />
                        </div>
                      </div>

                      <div>{getSeverityBadge(vuln.severity)}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div>{children}</div>
            </motion.div>

          </div>
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
}
