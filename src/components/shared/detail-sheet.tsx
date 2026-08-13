"use client";

import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function DetailSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="font-heading">{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex flex-col gap-5 p-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export function DetailField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function DetailFieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 first:border-0 first:pt-0">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}
