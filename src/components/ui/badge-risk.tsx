"use client";

import { Badge } from "@/components/ui/badge";

const riskVariants: Record<string, string> = {
    low: "bg-green-500/15 text-green-700",
    medium: "bg-yellow-500/20 text-yellow-700",
    high: "bg-orange-500/20 text-orange-700",
    critical: "bg-red-500/20 text-red-700 font-semibold",
};

export function RiskBadge({ risk }: { risk: string }) {
    const variant = riskVariants[risk.toLowerCase()] || "bg-gray-500/20 text-gray-700";

    return <Badge className={`${variant} capitalize`}>{risk}</Badge>;
}
