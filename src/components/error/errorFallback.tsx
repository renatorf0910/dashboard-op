"use client";

import { Button } from "@/components/ui/button";
import { ErrorFallbackProps } from "@/domain/types/error/ErrorBoundaryProps";
import { X } from "lucide-react";

export function ErrorFallback({
  title = "Something went wrong",
  message = "An unexpected error has occurred. Please try again",
  error,
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] w-full flex flex-col items-center justify-center px-6 py-10 bg-neutral-50">
      <div className="flex flex-col items-center text-center max-w-2xl gap-6">
        <X className="h-20 w-20 text-red-600" />
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {onRetry && (
            <Button size="sm" onClick={onRetry}>
              Try again
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={() => window.location.href = "/assets"}
          >
            Back to assets
          </Button>
        </div>
      </div>
    </div>
  );
}
