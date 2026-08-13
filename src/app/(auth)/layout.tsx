import Link from "next/link";
import { Truck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-md sm:p-8">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-element)] bg-primary text-primary-foreground">
            <Truck size={18} aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-semibold">LogiSight</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
