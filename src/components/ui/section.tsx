import React from "react";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary-side-bar mb-3">{title}</h3>
            <div className="bg-muted/40 p-6 rounded-xl border">{children}</div>
        </div>
    );
}
