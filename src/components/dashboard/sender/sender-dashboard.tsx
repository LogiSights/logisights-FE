"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Package, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import {
  DetailSheet,
  DetailField,
  DetailFieldGrid,
  DetailSection,
} from "@/components/shared/detail-sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusTimeline } from "./status-timeline";
import { senderStats } from "@/lib/mock/stats";
import { mockParcels } from "@/lib/mock/parcels";
import { TRACKING_STEPS, trackingStepIndex } from "@/lib/sender/tracking";
import type { Parcel, ParcelStatus } from "@/types/models";

const STATUS_FILTERS: { label: string; value: ParcelStatus | "ALL" }[] = [
  { label: "All statuses", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "In transit", value: "IN_TRANSIT" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Failed", value: "FAILED" },
];

export function SenderDashboard() {
  const [statusFilter, setStatusFilter] = useState<ParcelStatus | "ALL">("ALL");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const activeParcel = mockParcels.find((parcel) => parcel.status === "IN_TRANSIT");

  const filteredParcels = useMemo(
    () =>
      statusFilter === "ALL"
        ? mockParcels
        : mockParcels.filter((parcel) => parcel.status === statusFilter),
    [statusFilter]
  );

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
        <Button size="sm" variant="outline" onClick={() => setSelectedParcel(row)}>
          Details
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

      {activeParcel && (
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-sm font-semibold">
              Active parcel &middot; {activeParcel.trackingId ?? activeParcel.id}
            </h2>
            <Button size="sm" variant="ghost" onClick={() => setSelectedParcel(activeParcel)}>
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
          data={filteredParcels}
          getRowId={(row) => row.id}
          searchable
          searchPlaceholder="Search by tracking ID or destination"
          searchAccessor={(row) => `${row.trackingId ?? row.id} ${row.destination}`}
          emptyMessage="No parcels match your filters."
          filters={
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as ParcelStatus | "ALL")}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTERS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      </div>

      <DetailSheet
        open={selectedParcel !== null}
        onOpenChange={(open) => !open && setSelectedParcel(null)}
        title={selectedParcel?.trackingId ?? selectedParcel?.id}
        description="Parcel details"
      >
        {selectedParcel && (
          <>
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedParcel.status} />
              <Button
                size="sm"
                variant="ghost"
                className="gap-1"
                nativeButton={false}
                render={
                  <Link href={`/sender/track/${selectedParcel.trackingId ?? selectedParcel.id}`} />
                }
              >
                Full tracker
                <ArrowUpRight size={14} aria-hidden="true" />
              </Button>
            </div>

            <StatusTimeline
              steps={TRACKING_STEPS}
              currentIndex={trackingStepIndex(selectedParcel.status)}
              failed={selectedParcel.status === "FAILED"}
            />

            <DetailSection title="Recipient">
              <DetailFieldGrid>
                <DetailField label="Name" value={selectedParcel.recipientName} />
                <DetailField label="Phone" value={selectedParcel.recipientPhone} />
              </DetailFieldGrid>
            </DetailSection>

            <DetailSection title="Shipment">
              <DetailFieldGrid>
                <DetailField label="Destination" value={selectedParcel.destination} />
                <DetailField label="City" value={selectedParcel.city} />
                <DetailField label="Weight" value={`${selectedParcel.weight} kg`} />
                <DetailField
                  label="Booked"
                  value={format(new Date(selectedParcel.dateCreated), "d MMM yyyy")}
                />
              </DetailFieldGrid>
            </DetailSection>
          </>
        )}
      </DetailSheet>
    </div>
  );
}
