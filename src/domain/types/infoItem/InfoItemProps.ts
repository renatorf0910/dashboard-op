type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

export interface InfoItemProps {
  label: string;
  value?: React.ReactNode;
  badge?: boolean;
  badgeVariant?: BadgeVariant;
  className?: string;
}