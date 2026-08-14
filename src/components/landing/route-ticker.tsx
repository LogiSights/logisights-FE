import { ArrowRight, CircleDot } from "lucide-react";

const ROUTES = [
  { from: "NAIROBI", to: "MOMBASA" },
  { from: "MOMBASA", to: "KISUMU" },
  { from: "KISUMU", to: "NAIROBI" },
  { from: "NAIROBI", to: "NAKURU" },
  { from: "WESTLANDS", to: "CBD" },
  { from: "KILIMANI", to: "KAREN" },
];

function TickerContent() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {ROUTES.map((route, i) => (
        <div key={i} className="flex shrink-0 items-center gap-2.5">
          <CircleDot size={10} className="shrink-0 text-primary-foreground/50" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold tracking-[0.08em] text-primary-foreground">
            {route.from}
          </span>
          <ArrowRight size={14} className="shrink-0 text-primary-foreground/40" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold tracking-[0.08em] text-primary-foreground">
            {route.to}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RouteTicker() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-navy py-3.5"
      role="status"
      aria-label="Live parcel routes"
    >
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
