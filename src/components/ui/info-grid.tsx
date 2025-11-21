import React from "react";

export function InfoGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {children}
        </div>
    );
}
