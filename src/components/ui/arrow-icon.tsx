"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

export function ArrowIcon({ sorted }: ArrowIconProps) {
  if (sorted === "asc") return <ArrowUp className="ml-2 h-4 w-4" />;
  if (sorted === "desc") return <ArrowDown className="ml-2 h-4 w-4" />;
  return <ArrowUp className="ml-2 h-4 w-4 opacity-40" />;
}
