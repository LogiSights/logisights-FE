"use client";

import { User, Truck, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/models";

const OPTIONS: { value: Role; label: string; icon: typeof User }[] = [
  { value: "SENDER", label: "Sender / Receiver", icon: User },
  { value: "DRIVER", label: "Driver", icon: Truck },
  { value: "PICKUP", label: "Pickup staff", icon: Store },
];

export function RolePicker({
  value,
  onChange,
}: {
  value: Role;
  onChange: (role: Role) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Account type">
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-[var(--radius-element)] border px-2 py-3 text-xs font-medium transition-colors",
              active
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Icon size={18} aria-hidden="true" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
