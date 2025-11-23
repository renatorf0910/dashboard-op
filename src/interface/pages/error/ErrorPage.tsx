"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function ErrorPage() {
  const [counter, setCounter] = useState(0);

  const throwSyncError = () => {
    throw new Error("Manually triggered synchronous error.");
  };

  const throwUndefinedAccess = () => {
    const x: any = undefined;
    console.log(x.foo.bar.baz);
  };

  const throwAsyncError = async () => {
    await new Promise((res) => setTimeout(res, 250));
    throw new Error("Manually triggered asynchronous error.");
  };

  return (
    <div className="h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] flex flex-col justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full"> 
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              About this module
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              This module demonstrates the error-handling strategy implemented in this project. 
              It includes a custom React Error Boundary.
            </p>
            <p>
              The purpose of this page is to help how the user see that error.
            </p>
            
          </CardContent>
        </Card>
        <Card className="shadow-sm border">
          <CardContent className="space-y-10">

            <Section title="Synchronous Errors">
              <div className="flex flex-col gap-3">
                <Button variant="destructive" onClick={throwSyncError}>
                  Trigger synchronous error
                </Button>

                <Button variant="destructive" onClick={throwUndefinedAccess}>
                  Trigger undefined access crash
                </Button>
              </div>
            </Section>

            <Section title="Asynchronous Errors">
              <div className="flex flex-col gap-3">
                <Button variant="destructive" onClick={throwAsyncError}>
                  Trigger asynchronous error
                </Button>
              </div>
            </Section>

            <Section title="Normal Interaction">
              <Button onClick={() => setCounter(counter + 1)} className="w-full">
                Increment counter: {counter}
              </Button>
            </Section>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
