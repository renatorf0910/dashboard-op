"use client";

import { Badge } from "@/components/ui/badge";

const riskVariants: Record<string, string> = {
    low: "bg-green-500/15 text-green-700",
    medium: "bg-yellow-500/20 text-yellow-700",
    high: "bg-orange-500/20 text-orange-700",
    critical: "bg-red-500/20 text-red-700 font-semibold",
    true: "bg-green-500/15 text-green-700",
    false: "bg-red-500/20 text-red-700 font-semibold",
};

type RiskType = string | boolean;

export function RiskBadge({ risk }: { risk: RiskType }) {
    const normalized = typeof risk === "boolean" ? String(risk) : risk.toLowerCase();
    const variant = riskVariants[normalized] || "bg-gray-500/20 text-gray-700";
    const label =
        typeof risk === "boolean"
            ? "Acknowledged"
            : risk;

    return <Badge className={`${variant} capitalize`}>{label}</Badge>;
}
