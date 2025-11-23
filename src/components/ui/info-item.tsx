import { Badge } from "@/components/ui/badge";
import { InfoItemProps } from "@/domain/types/infoItem/InfoItemProps";
import clsx from "clsx";

export function InfoItem({
  label,
  value,
  badge = false,
  badgeVariant = "outline",
}: InfoItemProps) {
  return (
    <div className="flex flex-col">
      <h4 className="text-sm text-muted-foreground mb-2">{label}</h4>

      {badge ? (
        <Badge variant={badgeVariant}>
          {value ?? "-"}
        </Badge>
      ) : (
        <h6 className="font-medium text-primary-white">
          {value ?? "-"}
        </h6>
      )}
    </div>
  );
}

export function InfoItemInLine({
  label,
  value,
  badge = false,
  badgeVariant = "outline",
  className
}: InfoItemProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      {badge ? (
        <h4 className="text-sm text-muted-foreground mb-2">
          {label}:{" "}
          <Badge className="ml-2 mt-1 mb-1" variant={badgeVariant}>
            {value ?? "-"}
          </Badge>
        </h4>
      ) : (
        <h4 className="text-sm mb-2">
          <span className="text-primary">{label}:</span>{" "}
          <span className="text-foreground font-medium">{value ?? "-"}</span>
        </h4>
      )}
    </div>
  );
}