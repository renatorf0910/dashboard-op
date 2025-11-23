"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function ErrorPage() {
  const [mode, setMode] = useState<null | "sync" | "async" | "undef">(null);

  if (mode === "sync") {
    throw new Error("Crash: synchronous error!");
  }

  if (mode === "undef") {
    const x: any = undefined;
    x.crash;
  }

  if (mode === "async") {
    throw new Error("Crash: asynchronous failure (converted to render)!");
  }

  return (
    <div className="h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] flex flex-col justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">      
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Error Testing Module
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              This page allows you to intentionally trigger errors to validate that the Error Boundary is working correctly.
            </p>
            <p>
              Each button below will throw a different type of error inside the render cycle, ensuring the Error Boundary catches it.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardContent className="space-y-10">

            <Section title="Render Errors">
              <div className="flex flex-col gap-3">

                <Button
                  variant="destructive"
                  onClick={() => setMode("sync")}
                >
                  Trigger render synchronous crash
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => setMode("undef")}
                >
                  Trigger undefined crash
                </Button>

                <Button
                  variant="destructive"
                  onClick={async () => {
                    await new Promise(r => setTimeout(r, 300));
                    setMode("async");
                  }}
                >
                  Trigger async crash
                </Button>
              </div>
            </Section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
