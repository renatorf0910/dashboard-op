"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { TypographyKey } from "@/components/ui/typographyKey";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { AssetDetailsDrawerProps } from "@/domain/types/assets/AssetsProps";
import { motion } from "framer-motion";
import { TypographyBlurred } from "../typographyBlurred";

export function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  vulnerabilities = [],
  isLoading = false,
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <ErrorBoundary fallback={"Error to render content"}>
          <div className="p-6 overflow-y-auto space-y-8 max-h-[100vh] bg-gradient-to-b from-gray-50 to-white">
            {asset ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-md border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
                      <Info className="h-5 w-5 text-blue-500" />
                      {asset.name}
                    </CardTitle>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {getRiskBadge(asset.risk)}
                      <Badge variant="outline" className="text-sm">
                        Supplier: {asset.supplier}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        Location: {asset.location}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-gray-700">
                    {Object.entries(asset).map(([key, value]) => (
                      <TypographyKey
                        key={key}
                        field={`${key}: ${String(value)}`}
                      />
                    ))}
                  </CardContent>
                </Card>
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

              {isLoading && (
                <p className="text-sm text-muted-foreground">Loading vulnerabilities...</p>
              )}

              {!isLoading && vulnerabilities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No vulnerabilities found for this asset.
                </p>
              )}

              {!isLoading && vulnerabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-4"
                >
                  {vulnerabilities.map((vuln) => (
                    <Card
                      key={vuln.id}
                      className="border-l-4 rounded-xl transition-all hover:shadow-lg hover:scale-[1.01]"
                      style={{
                        borderColor:
                          vuln.severity === "high"
                            ? "#ef4444"
                            : vuln.severity === "medium"
                              ? "#facc15"
                              : vuln.severity === "low"
                                ? "#22c55e"
                                : "#7f1d1d",
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-gray-500" />
                          {vuln.title}
                        </CardTitle>
                        {getSeverityBadge(vuln.severity)}
                      </CardHeader>

                      <CardContent className="text-sm text-gray-600 grid gap-1">
                        <TypographyBlurred field={`Scope: ${vuln.scope}`} />  
                        <TypographyBlurred field={`Ref ID: ${vuln.refId}`} />
                        <TypographyBlurred field={`CVSS: ${vuln.cvss}`} />
                        <TypographyBlurred field={`Acknowledged: ${vuln.acknowledged ? "✅" : "❌"}`} />

                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
}
