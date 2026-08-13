import {
  TrendingDown,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  Wallet,
  ClipboardList,
  Users,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types/models";

function renderStatIcon(name?: string) {
  switch (name) {
    case "Truck":
      return <Truck size={16} aria-hidden="true" />;
    case "CheckCircle2":
      return <CheckCircle2 size={16} aria-hidden="true" />;
    case "Clock":
      return <Clock size={16} aria-hidden="true" />;
    case "Wallet":
      return <Wallet size={16} aria-hidden="true" />;
    case "ClipboardList":
      return <ClipboardList size={16} aria-hidden="true" />;
    case "Users":
      return <Users size={16} aria-hidden="true" />;
    case "Gauge":
      return <Gauge size={16} aria-hidden="true" />;
    default:
      return null;
  }
}

export function StatCard({ stat, className }: { stat: Stat; className?: string }) {
  const icon = renderStatIcon(stat.icon);
  const isPositive = (stat.change ?? 0) >= 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-[var(--radius-card)] border border-border bg-card p-4 shadow-sm sm:p-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{stat.label}</span>
        {icon && (
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-element)] bg-accent text-accent-foreground">
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-2xl font-semibold text-foreground">
          {stat.value.toLocaleString()}
        </span>
        {stat.change !== undefined && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? (
              <TrendingUp size={14} aria-hidden="true" />
            ) : (
              <TrendingDown size={14} aria-hidden="true" />
            )}
            {Math.abs(stat.change)}%
          </span>
        )}
      </div>
    </div>
  );
}
