"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorFallbackProps } from "@/domain/types/error/ErrorBoundaryProps";
import { AlertCircle } from "lucide-react";

export function ErrorFallback({
  title = "Something went wrong",
  message = "An unexpected error occurred while processing your request.",
  error,
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="w-full flex items-center justify-center p-6 min-h-[70vh]">
      <Card className="max-w-lg w-full shadow-lg border-red-200">
        <CardHeader className="text-center space-y-3">
          <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground text-base leading-relaxed">
            {message}
          </p>

          {error && (
            <pre className="bg-red-50 border border-red-200 text-left p-3 rounded text-red-700 text-sm overflow-x-auto max-h-40 whitespace-pre-wrap">
              {error.message}
            </pre>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            {onRetry && (
              <Button size="lg" onClick={onRetry}>
                Try again
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = "/"}
            >
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
