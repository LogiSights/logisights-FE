"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Package, Search } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusTimeline } from "./status-timeline";
import { senderStats } from "@/lib/mock/stats";
import { mockParcels } from "@/lib/mock/parcels";
import { TRACKING_STEPS, trackingStepIndex } from "@/lib/sender/tracking";
import type { Parcel } from "@/types/models";

export function SenderDashboard() {
  const router = useRouter();
  const [trackingQuery, setTrackingQuery] = useState("");
  const activeParcel = mockParcels.find((parcel) => parcel.status === "IN_TRANSIT");

  function handleTrack(event: React.FormEvent) {
    event.preventDefault();
    const query = trackingQuery.trim();
    if (query) router.push(`/sender/track/${encodeURIComponent(query)}`);
  }

  const columns: DataTableColumn<Parcel>[] = [
    { key: "trackingId", header: "Tracking ID", accessor: (row) => row.trackingId ?? row.id },
    { key: "destination", header: "Destination", accessor: (row) => row.destination },
    {
      key: "dateCreated",
      header: "Date",
      sortable: true,
      sortValue: (row) => row.dateCreated,
      accessor: (row) => format(new Date(row.dateCreated), "d MMM yyyy"),
    },
    { key: "weight", header: "Weight (kg)", sortable: true, sortValue: (row) => row.weight, accessor: (row) => row.weight },
    { key: "status", header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
    {
      key: "action",
      header: "",
      accessor: (row) => (
        <Button
          size="sm"
          variant="outline"
          nativeButton={false}
          render={<Link href={`/sender/track/${row.trackingId ?? row.id}`} />}
        >
          Track
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-xl font-semibold">Sender dashboard</h1>
        <Button className="gap-1.5" nativeButton={false} render={<Link href="/sender/book" />}>
          <Package size={16} aria-hidden="true" />
          Book a parcel
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {senderStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <form onSubmit={handleTrack} className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={trackingQuery}
          onChange={(event) => setTrackingQuery(event.target.value)}
          placeholder="Track a parcel by tracking ID, e.g. KE-00123"
          className="sm:max-w-xs"
        />
        <Button type="submit" variant="outline" className="gap-1.5">
          <Search size={16} aria-hidden="true" />
          Track
        </Button>
      </form>

      {activeParcel && (
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-sm font-semibold">
              Active parcel &middot; {activeParcel.trackingId ?? activeParcel.id}
            </h2>
            <Button
              size="sm"
              variant="ghost"
              nativeButton={false}
              render={<Link href={`/sender/track/${activeParcel.trackingId ?? activeParcel.id}`} />}
            >
              View details
            </Button>
          </div>
          <StatusTimeline
            steps={TRACKING_STEPS}
            currentIndex={trackingStepIndex(activeParcel.status)}
            failed={activeParcel.status === "FAILED"}
          />
        </div>
      )}

      <div>
        <h2 className="mb-3 font-heading text-sm font-semibold">Parcel history</h2>
        <DataTable
          columns={columns}
          data={mockParcels}
          getRowId={(row) => row.id}
          searchable
          searchPlaceholder="Search by tracking ID or destination"
          searchAccessor={(row) => `${row.trackingId ?? row.id} ${row.destination}`}
          emptyMessage="No parcels yet."
        />
      </div>
    </div>
  );
}
