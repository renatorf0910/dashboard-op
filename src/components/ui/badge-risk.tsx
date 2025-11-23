"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const riskVariants: Record<string, string> = {
  low: "bg-green-500/15 text-green-700",
  medium: "bg-yellow-500/20 text-yellow-700",
  high: "bg-orange-500/20 text-orange-700",
  critical: "bg-red-500/20 text-red-700 font-semibold",
  true: "bg-green-500/15 text-green-700",
  false: "bg-red-500/20 text-red-700 font-semibold",
};

const riskMessages: Record<string, string> = {
  low: "Low risk. The asset shows minimal exposure and no immediate action is required.",
  medium: "Moderate risk. The asset should be monitored to ensure conditions remain stable.",
  high: "High risk. Review the asset’s configuration and investigate the contributing factors.",
  critical: "Critical risk. Immediate investigation and remediation are strongly recommended.",
  true: "This vulnerability has been acknowledged.",
  false: "This vulnerability has not been acknowledged and may require review.",
};

type RiskType = string | boolean;

export function RiskBadge({ risk }: { risk: RiskType }) {
  const isBoolean = typeof risk === "boolean";
  const normalized = isBoolean ? String(risk) : risk.toLowerCase();
  const variant = riskVariants[normalized] || "bg-gray-500/20 text-gray-700";

  const label = isBoolean
    ? risk
      ? "Acknowledged"
      : "Not Acknowledged"
    : risk;

  const message = riskMessages[normalized];

  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="inline-flex items-center gap-1 cursor-help"
          >
            <Badge className={`${variant} capitalize`}>
              {label}
            </Badge>
            <Info className="h-3.5 w-3.5 opacity-60 hover:opacity-100 transition" />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
