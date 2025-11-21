import React from "react";

export function InfoItem({ label, value }: { label: string; value?: React.ReactNode;}) {
    return (
        <div className="flex flex-col">
            <h4 className="text-sm text-muted-foreground mb-2">{label}</h4>
            <h4 className="font-medium text-primary-white">
                {value ?? "-"}
            </h4>
        </div>
    );
}

