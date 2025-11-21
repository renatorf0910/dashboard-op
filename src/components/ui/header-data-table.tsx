"use client";

import { Button } from "@/components/ui/button";
import { ArrowIcon } from "./arrow-icon";
import { HeaderContext } from "@tanstack/react-table";

export function HeaderDataTable<T>(label: string) {
  return ({ column }: HeaderContext<T, unknown>) => {
    const sorted = column.getIsSorted();

    return (
      <Button
        variant="flush"
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        {label} <ArrowIcon sorted={sorted} />
      </Button>
    );
  };
}
