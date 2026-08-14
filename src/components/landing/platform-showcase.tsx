"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { BarChart3, Bell, MapPinned, ShieldCheck } from "lucide-react";
import { CountUp } from "@/components/landing/count-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FEATURES = [
  {
    icon: MapPinned,
    title: "Live parcel tracking",
    description:
      "Every status change, pending, in transit, delivered, or failed, streams to sender, driver, and admin views instantly.",
  },
  {
    icon: Bell,
    title: "Role-aware notifications",
    description:
      "Drivers get pickup alerts, senders get delivery confirmations, and admins get exception flags. No noise, just what matters.",
  },
  {
    icon: BarChart3,
    title: "Operational dashboards",
    description:
      "Volume, on-time rate, and driver performance in one view, built for daily dispatch decisions, not quarterly reports.",
  },
  {
    icon: ShieldCheck,
    title: "Role-gated access",
    description:
      "Senders, drivers, pickup agents, and admins each see exactly the tools and data their role needs, nothing more.",
  },
];

export function PlatformShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 24 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 5);
    rotateX.set(y * -5);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section id="platform" className="relative overflow-hidden bg-muted/40 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[32rem] rounded-full bg-primary/5 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              The platform
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for how logistics teams actually work
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              One data model, four role-specific interfaces. What a sender books, a driver
              fulfills, a pickup agent hands off, and an admin oversees, all without anyone
              leaving the platform.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                >
                  <dt className="flex items-center gap-2.5 font-heading text-sm font-semibold">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-element)] bg-primary/10 text-primary">
                      <feature.icon size={16} aria-hidden="true" />
                    </span>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <motion.div
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformPerspective: 1200,
              }}
              className="relative rounded-2xl border border-border bg-card p-2 shadow-xl"
            >
              <AdminMockup />
            </motion.div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-[var(--radius-element)] border border-border bg-card px-4 py-3 shadow-lg sm:block">
              <p className="text-[11px] font-medium text-muted-foreground">Success rate</p>
              <p className="font-heading text-lg font-semibold text-success">
                <CountUp value={96.4} suffix="%" decimals={1} />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AdminMockup() {
  return (
    <div className="overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-navy p-5">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-24 rounded-full bg-white/20" />
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Total parcels", value: "1,284", className: "text-[#8FB8FF]" },
          { label: "Active drivers", value: "32", className: "text-success" },
          { label: "Revenue", value: "942K", className: "text-warning" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[10px] text-white/50">{stat.label}</p>
            <p className={`mt-1 font-heading text-sm font-semibold ${stat.className}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-end gap-2">
          {[35, 55, 40, 70, 60, 90, 75].map((h, i) => (
            <div key={i} className="flex-1">
              <div
                className="rounded-t bg-[#8FB8FF]"
                style={{ height: `${h}px` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-white/[0.04] p-3">
        {[
          { name: "LS-88213", status: "Delivered", color: "#4ADE80" },
          { name: "LS-88214", status: "In transit", color: "#4C8DFF" },
          { name: "LS-88215", status: "Pending", color: "#FBBF24" },
        ].map((row) => (
          <div key={row.name} className="flex items-center justify-between">
            <span className="h-2 w-20 rounded-full bg-white/15" />
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={{ backgroundColor: `${row.color}26`, color: row.color }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
