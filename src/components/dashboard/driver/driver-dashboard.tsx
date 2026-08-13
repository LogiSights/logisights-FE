"use client";

import { useMemo, useState } from "react";
import { Undo2, MapPin, Clock, Wallet, Gauge } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  driverTasks as initialTasks,
  EARNINGS_PER_DELIVERY_KSH,
  type DeliveryTask,
  type DeliveryTaskStatus,
} from "@/lib/mock/driver";

const STATUS_SEQUENCE: DeliveryTaskStatus[] = [
  "PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
];

const STATUS_LABEL: Record<DeliveryTaskStatus, string> = {
  PENDING: "Pending",
  PICKED_UP: "Picked up",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
};

const STATUS_STYLES: Record<DeliveryTaskStatus, string> = {
  PENDING: "bg-warning/15 text-warning border-warning/30",
  PICKED_UP: "bg-info/15 text-info border-info/30",
  IN_TRANSIT: "bg-info/15 text-info border-info/30",
  DELIVERED: "bg-success/15 text-success border-success/30",
};

const NEXT_ACTION_LABEL: Record<DeliveryTaskStatus, string> = {
  PENDING: "Mark picked up",
  PICKED_UP: "Mark in transit",
  IN_TRANSIT: "Mark delivered",
  DELIVERED: "Completed",
};

function nextStatus(status: DeliveryTaskStatus): DeliveryTaskStatus | null {
  const index = STATUS_SEQUENCE.indexOf(status);
  return index < STATUS_SEQUENCE.length - 1 ? STATUS_SEQUENCE[index + 1] : null;
}

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [tasks, setTasks] = useState<DeliveryTask[]>(initialTasks);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.status === "DELIVERED").length,
    [tasks]
  );
  const pendingCount = tasks.length - completedCount;
  const earnings = completedCount * EARNINGS_PER_DELIVERY_KSH;
  const totalDistance = useMemo(
    () => tasks.reduce((sum, task) => sum + task.distanceKm, 0),
    [tasks]
  );

  function handleToggleOnline(checked: boolean) {
    setIsOnline(checked);
    toast.info(checked ? "You are now online" : "You went offline");
  }

  function handleAdvance(taskId: string) {
    if (!isOnline) {
      toast.error("You must be online to update status");
      return;
    }
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) return task;
        const next = nextStatus(task.status);
        if (!next) return task;
        if (next === "DELIVERED") toast.success(`Parcel ${task.id} delivered!`);
        else toast.info(`Parcel ${task.id} marked ${STATUS_LABEL[next].toLowerCase()}`);
        return { ...task, status: next, history: [...task.history, task.status] };
      })
    );
  }

  function handleUndo(taskId: string) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId || task.history.length === 0) return task;
        const history = [...task.history];
        const previous = history.pop()!;
        toast.info(`Status reverted to ${STATUS_LABEL[previous]}`);
        return { ...task, status: previous, history };
      })
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-xl font-semibold">Driver dashboard</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="online-toggle" className="text-sm text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </Label>
          <Switch id="online-toggle" checked={isOnline} onCheckedChange={handleToggleOnline} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard stat={{ label: "Delivered today", value: completedCount, icon: "CheckCircle2" }} />
        <StatCard stat={{ label: "Remaining stops", value: pendingCount, icon: "Truck" }} />
        <StatCard stat={{ label: "Earnings (Ksh)", value: earnings, icon: "Wallet" }} />
        <StatCard stat={{ label: "Distance (km)", value: totalDistance, icon: "Gauge" }} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-sm font-semibold">Today&apos;s route</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{task.recipientName}</span>
                <Badge variant="outline" className={cn("font-medium", STATUS_STYLES[task.status])}>
                  {STATUS_LABEL[task.status]}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={13} aria-hidden="true" />
                  {task.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} aria-hidden="true" />
                  {task.timeWindow}
                </span>
                <span className="flex items-center gap-1">
                  <Gauge size={13} aria-hidden="true" />
                  {task.distanceKm} km
                </span>
                <span className="flex items-center gap-1">
                  <Wallet size={13} aria-hidden="true" />
                  {task.id}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {task.history.length > 0 && (
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Undo status"
                  onClick={() => handleUndo(task.id)}
                >
                  <Undo2 size={16} aria-hidden="true" />
                </Button>
              )}
              <Button
                size="sm"
                disabled={task.status === "DELIVERED"}
                onClick={() => handleAdvance(task.id)}
              >
                {NEXT_ACTION_LABEL[task.status]}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
