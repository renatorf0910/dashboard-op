"use client";

import { AssetsDataTableMobileProps } from "@/domain/types/assets/AssetsProps";
import { RiskBadge } from "../badge-risk";
import { LocationBadge } from "../location-badge";
import { motion } from "framer-motion";

export function AssetsDataTableMobile({ assets, onSelect }: AssetsDataTableMobileProps) {
    if (!assets?.length) {
        return (
            <div className="text-center text-muted-foreground py-6">
                No results
            </div>
        );
    }

    return (
        <div className="space-y-6  px-4">
            {assets.map((asset) => (
                <motion.div
                    key={asset.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelect(asset)}
                    className="p-4 w-full max-w-[480px] mx-auto rounded-xl border bg-secondary-foreground shadow-sm flex flex-col gap-3 transition-all hover:shadow-md"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-foreground">
                            {asset.name}
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm">
                        <RiskBadge risk={asset.risk} />
                        <LocationBadge code={asset.location} />

                        <span className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                            Score: {asset.riskScore}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                            {asset.supplier}
                        </span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Tap to view details →
                    </div>
                </motion.div>

            ))}
        </div>
    );
}
