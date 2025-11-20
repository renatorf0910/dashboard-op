import React from "react";

export function InfoItem({ label, value }: { label: string; value?: React.ReactNode;}) {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-muted-foreground mb-2">{label}</span>
            <span className="text-base font-medium text-foreground">
                {value ?? "-"}
            </span>
        </div>
    );
}

