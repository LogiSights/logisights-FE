"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ArrowDownToLine, ArrowUpFromLine, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  pickupActivity as initialActivity,
  pickupInventory as initialInventory,
  pickupSummary,
  type PickupActivityEvent,
  type PickupInventoryItem,
} from "@/lib/mock/pickup";

const OVERDUE_THRESHOLD_DAYS = 3;

export function PickupDashboard() {
  const [inventory, setInventory] = useState<PickupInventoryItem[]>(initialInventory);
  const [activity, setActivity] = useState<PickupActivityEvent[]>(initialActivity);
  const [checkInId, setCheckInId] = useState("");

  const overdueCount = useMemo(
    () => inventory.filter((item) => item.daysWaiting > OVERDUE_THRESHOLD_DAYS).length,
    [inventory]
  );

  function handleCheckIn(event: React.FormEvent) {
    event.preventDefault();
    const trackingId = checkInId.trim().toUpperCase();
    if (!trackingId) {
      toast.error("Enter a tracking ID");
      return;
    }

    const newItem: PickupInventoryItem = {
      id: trackingId,
      recipientName: "Walk-in customer",
      phone: "N/A",
      dateArrived: new Date().toISOString(),
      daysWaiting: 0,
      status: "PENDING",
    };
    setInventory((current) => [newItem, ...current]);
    setActivity((current) => [
      {
        id: `${Date.now()}`,
        time: new Date().toISOString(),
        staff: "You",
        action: "Checked in",
        parcelId: trackingId,
        type: "in",
      },
      ...current,
    ]);
    toast.success(`Parcel ${trackingId} checked in`);
    setCheckInId("");
  }

  function handleHandOver(id: string) {
    setInventory((current) => current.filter((item) => item.id !== id));
    setActivity((current) => [
      {
        id: `${Date.now()}`,
        time: new Date().toISOString(),
        staff: "You",
        action: "Checked out",
        parcelId: id,
        type: "out",
      },
      ...current,
    ]);
    toast.success(`Parcel ${id} handed over`);
  }

  const columns: DataTableColumn<PickupInventoryItem>[] = [
    { key: "id", header: "Tracking ID", accessor: (row) => row.id },
    { key: "recipientName", header: "Recipient", accessor: (row) => row.recipientName },
    { key: "phone", header: "Phone", accessor: (row) => row.phone },
    {
      key: "dateArrived",
      header: "Arrived",
      sortable: true,
      sortValue: (row) => row.dateArrived,
      accessor: (row) => format(new Date(row.dateArrived), "d MMM, HH:mm"),
    },
    {
      key: "daysWaiting",
      header: "Waiting",
      sortable: true,
      sortValue: (row) => row.daysWaiting,
      accessor: (row) => (
        <span className={cn(row.daysWaiting > OVERDUE_THRESHOLD_DAYS && "font-medium text-destructive")}>
          {row.daysWaiting}d
        </span>
      ),
    },
    { key: "status", header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
    {
      key: "action",
      header: "",
      accessor: (row) => (
        <Button size="sm" variant="outline" onClick={() => handleHandOver(row.id)}>
          Hand over
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-xl font-semibold">Pickup dashboard</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard stat={{ label: "Awaiting pickup", value: inventory.length, icon: "ClipboardList" }} />
        <StatCard stat={{ label: "Checked in today", value: pickupSummary.checkedInToday, icon: "Truck" }} />
        <StatCard stat={{ label: "Checked out today", value: pickupSummary.checkedOutToday, icon: "CheckCircle2" }} />
        <StatCard stat={{ label: "Overdue", value: overdueCount, icon: "Clock" }} />
      </div>

      <form
        onSubmit={handleCheckIn}
        className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border bg-card p-4 sm:flex-row sm:items-end sm:gap-3"
      >
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="checkInId">Check in a parcel</Label>
          <Input
            id="checkInId"
            placeholder="Tracking ID, e.g. KE-2045"
            value={checkInId}
            onChange={(event) => setCheckInId(event.target.value)}
          />
        </div>
        <Button type="submit" className="h-9 gap-1.5">
          <PackageCheck size={16} aria-hidden="true" />
          Check in
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable
            columns={columns}
            data={inventory}
            getRowId={(row) => row.id}
            searchable
            searchPlaceholder="Search by tracking ID or recipient"
            searchAccessor={(row) => `${row.id} ${row.recipientName}`}
            emptyMessage="No parcels awaiting pickup."
          />
        </div>
        <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-card p-4">
          <h2 className="font-heading text-sm font-semibold">Recent activity</h2>
          <ul className="flex flex-col gap-3">
            {activity.map((event) => (
              <li key={event.id} className="flex items-start gap-2.5 text-sm">
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                    event.type === "in"
                      ? "bg-success/15 text-success"
                      : "bg-info/15 text-info"
                  )}
                >
                  {event.type === "in" ? (
                    <ArrowDownToLine size={13} aria-hidden="true" />
                  ) : (
                    <ArrowUpFromLine size={13} aria-hidden="true" />
                  )}
                </span>
                <div className="flex flex-col">
                  <span>
                    {event.action} <span className="font-medium">{event.parcelId}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(event.time), "d MMM, HH:mm")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
