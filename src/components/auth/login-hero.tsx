import Image from "next/image";
import { Truck, MapPin, ShieldCheck } from "lucide-react";

const TRUST_STATS = [
  { label: "Parcels tracked", value: "12,500+" },
  { label: "Cities covered", value: "3" },
  { label: "On-time delivery", value: "96%" },
];

export function LoginHero() {
  return (
    <div className="relative hidden overflow-hidden bg-navy lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-10 xl:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 size-96 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative z-10 flex items-center gap-2 animate-fade-up">
        <span className="flex size-9 items-center justify-center rounded-[var(--radius-element)] bg-white/10 text-white backdrop-blur">
          <Truck size={20} aria-hidden="true" />
        </span>
        <span className="font-heading text-lg font-semibold text-white">LogiSight</span>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center py-8">
        <div className="animate-float">
          <Image
            src="/login-illustration.png"
            alt="Isometric illustration of a logistics warehouse loading a delivery truck"
            width={520}
            height={498}
            priority
            className="w-full max-w-md rounded-2xl drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 animate-fade-up [animation-delay:150ms]">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white xl:text-3xl">
            Track every parcel, everywhere in Kenya.
          </h2>
          <p className="mt-2 max-w-sm text-sm text-white/70">
            One platform for senders, drivers, pickup points, and admins to move parcels from
            booking to delivery in real time.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-white/60">{stat.label}</dt>
              <dd className="font-heading text-lg font-semibold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} aria-hidden="true" />
            Secure by design
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            Nairobi &middot; Mombasa &middot; Kisumu
          </span>
        </div>
      </div>
    </div>
  );
}
