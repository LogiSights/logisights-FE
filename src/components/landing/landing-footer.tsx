import Link from "next/link";
import { Truck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="block font-heading text-6xl leading-none font-semibold tracking-tight text-foreground sm:text-8xl lg:text-9xl"
        >
          LogiSight
        </Link>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-[var(--radius-element)] bg-primary text-primary-foreground">
            <Truck size={14} aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-semibold">LogiSight</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LogiSight. Logistics platform for the Kenyan market.
        </p>
      </div>
    </footer>
  );
}
