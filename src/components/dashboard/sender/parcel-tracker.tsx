import Link from "next/link";
import { ArrowLeft, MapPin, Package, User } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { StatusTimeline } from "./status-timeline";
import { mockParcels } from "@/lib/mock/parcels";
import { TRACKING_STEPS, trackingStepIndex } from "@/lib/sender/tracking";

export function ParcelTracker({ trackingId }: { trackingId: string }) {
  const parcel = mockParcels.find(
    (item) => item.trackingId === trackingId || item.id === trackingId
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          nativeButton={false}
          render={<Link href="/sender" aria-label="Back to dashboard" />}
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </Button>
        <h1 className="font-heading text-xl font-semibold">Track parcel</h1>
      </div>

      {!parcel ? (
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          No parcel found for tracking ID <span className="font-medium">{trackingId}</span>.
        </div>
      ) : (
        <div className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Tracking ID</p>
              <p className="font-heading text-lg font-semibold">
                {parcel.trackingId ?? parcel.id}
              </p>
            </div>
            <StatusBadge status={parcel.status} />
          </div>

          <StatusTimeline
            steps={TRACKING_STEPS}
            currentIndex={trackingStepIndex(parcel.status)}
            failed={parcel.status === "FAILED"}
          />

          <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <User size={16} className="mt-0.5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Recipient</p>
                <p className="text-sm font-medium">{parcel.recipientName}</p>
                <p className="text-sm text-muted-foreground">{parcel.recipientPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Destination</p>
                <p className="text-sm font-medium">{parcel.destination}</p>
                <p className="text-sm text-muted-foreground">{parcel.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Package size={16} className="mt-0.5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="text-sm font-medium">{parcel.weight} kg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
