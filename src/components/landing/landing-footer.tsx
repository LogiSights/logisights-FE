import Link from "next/link";
import { Truck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-[var(--radius-element)] bg-primary text-primary-foreground">
            <Truck size={14} aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-semibold">LogiSight</span>
        </Link>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LogiSight. Logistics platform for the Kenyan market.
        </p>
      </div>
    </footer>
  );
}
