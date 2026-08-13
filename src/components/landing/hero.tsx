"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const FLOATING_CARDS = [
  {
    icon: PackageCheck,
    label: "Parcel #LS-88213",
    value: "Delivered · 12:04 PM",
    className: "left-[4%] top-[18%] lg:left-[8%]",
    depth: 24,
  },
  {
    icon: Truck,
    label: "Driver en route",
    value: "Westlands → CBD",
    className: "right-[2%] top-[38%] lg:right-[6%]",
    depth: 40,
  },
  {
    icon: MapPin,
    label: "Pickup point",
    value: "Nairobi · Kilimani",
    className: "left-[10%] bottom-[10%] lg:left-[14%]",
    depth: 16,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0A1526]"
    >
      {/* depth-0: far background wash */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='0.5'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* depth-1: glow atmosphere */}
      <motion.div aria-hidden="true" style={{ y: midY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 size-[28rem] rounded-full bg-primary/15 blur-[110px]" />
        <div className="absolute -right-24 top-0 size-[26rem] rounded-full bg-[#4C8DFF]/10 blur-[110px]" />
      </motion.div>

      {/* depth-2: route line decoration */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-40 lg:block"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <path
          d="M-50 620 C 250 520, 380 720, 600 560 S 950 320, 1250 380"
          stroke="#4C8DFF"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-28 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="animate-fade-up font-heading text-4xl font-semibold tracking-tight text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            Every parcel, tracked from <span className="text-[#8FB8FF]">booking to doorstep</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/70 [animation-delay:160ms] sm:text-lg">
            LogiSight connects senders, drivers, pickup points, and dispatch teams on one
            operational platform built for Kenya&apos;s logistics networks, real-time status,
            zero guesswork.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <Button
              size="lg"
              className="h-11 gap-2 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="/register" />}
            >
              Get started free
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-6 text-sm text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<a href="#how-it-works" />}
            >
              See how it works
            </Button>
          </div>
        </motion.div>

        {/* depth-3: product stage with floating status cards */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative mx-auto mt-16 flex w-full max-w-4xl flex-1 items-center justify-center pb-16"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <DashboardPreview />
          </div>

          {FLOATING_CARDS.map(({ icon: Icon, label, value, className, depth }) => (
            <FloatingCard
              key={label}
              icon={Icon}
              label={label}
              value={value}
              className={className}
              depth={depth}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  icon: Icon,
  label,
  value,
  className,
  depth,
}: {
  icon: typeof Truck;
  label: string;
  value: string;
  className: string;
  depth: number;
}) {
  return (
    <div
      className={`animate-float absolute z-20 hidden items-center gap-2.5 rounded-[var(--radius-element)] border border-white/10 bg-[#0D1B2A]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex ${className}`}
      style={{ animationDuration: `${5 + depth / 10}s` }}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[#8FB8FF]">
        <Icon size={15} aria-hidden="true" />
      </span>
      <div>
        <p className="text-[11px] font-medium text-white/60">{label}</p>
        <p className="text-xs font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="h-2 w-28 rounded-full bg-white/10" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col gap-3 rounded-[var(--radius-element)] border border-white/10 bg-white/[0.04] p-4">
          <div className="h-2.5 w-20 rounded-full bg-white/15" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.05] p-2">
                <div className="h-1.5 w-8 rounded-full bg-white/20" />
                <div className="mt-2 h-3 w-10 rounded-full bg-white/25" />
              </div>
            ))}
          </div>
          <div className="mt-1 flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            {["PENDING", "IN_TRANSIT", "DELIVERED"].map((row, i) => (
              <div
                key={row}
                className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"
                style={{ opacity: 1 - i * 0.18 }}
              >
                <div className="h-2 w-24 rounded-full bg-white/15" />
                <div className="h-2 w-14 rounded-full bg-[#4C8DFF]/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-[var(--radius-element)] border border-white/10 bg-white/[0.04] p-3">
            <div className="h-2 w-14 rounded-full bg-white/15" />
            <div className="mt-3 flex items-end gap-1.5">
              {[40, 70, 55, 90, 65].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t bg-[#4C8DFF]/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-[var(--radius-element)] border border-white/10 bg-white/[0.04] p-3">
            <div className="h-2 w-16 rounded-full bg-white/15" />
            <div className="mt-2 h-6 w-full rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}
