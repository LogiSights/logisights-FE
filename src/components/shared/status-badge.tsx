import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ParcelStatus } from "@/types/models";

const STATUS_STYLES: Record<ParcelStatus, string> = {
  PENDING: "bg-warning/15 text-warning border-warning/30",
  IN_TRANSIT: "bg-info/15 text-info border-info/30",
  DELIVERED: "bg-success/15 text-success border-success/30",
  FAILED: "bg-destructive/15 text-destructive border-destructive/30",
};

const STATUS_LABELS: Record<ParcelStatus, string> = {
  PENDING: "Pending",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
  FAILED: "Failed",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ParcelStatus;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STATUS_STYLES[status], className)}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}
