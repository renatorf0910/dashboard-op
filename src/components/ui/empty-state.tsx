"use client";

import { EmptyStateProps } from "@/domain/types/emptyState/EmptyStateProps";
import { Button } from "./button";

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
      <h2 className="text-xl font-semibold">{title}</h2>

      {description && (
        <p className="text-muted-foreground text-sm text-center max-w-sm">
          {description}
        </p>
      )}

        <Button
          className="px-4 py-2 rounded-md border cursor-pointer"
          onClick={onAction}
          autoFocus
        >
          {actionLabel}
        </Button>
    </div>
  );
}
