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
import { LocationBadge } from "../location-badge";
import { RiskBadge } from "../badge-risk";

export function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  vulnerabilities = [],
  isLoading = false,
  children,
}: AssetDetailsDrawerProps) {

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
                  <RiskBadge risk={asset.risk} />
                  <LocationBadge code={asset.location} />
                  <Badge variant="outline">{asset.riskScore}</Badge>
                  <Badge variant="outline">{asset.supplier}</Badge>
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
                          <RiskBadge risk={vuln.acknowledged} />
                        </div>
                      </div>

                      
                      <div><RiskBadge risk={vuln.severity} /></div>
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
