"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, LayoutDashboard, MapPin, Send, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MagneticButton } from "@/components/landing/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ORBIT_NODES = [
  { icon: Send, style: { top: "12%", left: "22%" }, live: false },
  { icon: Truck, style: { top: "34%", left: "6%" }, live: true },
  { icon: MapPin, style: { top: "68%", left: "6%" }, live: false },
  { icon: LayoutDashboard, style: { top: "88%", left: "22%" }, live: false },
];

const AVATAR_INITIALS = ["MW", "JK", "AO"];

const FLOATING_CARDS = [
  {
    icon: Send,
    label: "Parcel #LS-88213",
    value: "Delivered · 12:04 PM",
    className: "left-[4%] top-[16%] lg:left-[6%]",
  },
  {
    icon: Truck,
    label: "Driver en route",
    value: "Westlands to CBD",
    className: "right-[2%] top-[36%] lg:right-[4%]",
  },
  {
    icon: MapPin,
    label: "Pickup point",
    value: "Nairobi, Kilimani",
    className: "left-[10%] bottom-[8%] lg:left-[12%]",
  },
];

const HEADLINE_LINES = ["Every parcel,", "tracked from booking", "to delivery"];

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const headlineLine = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "end start"],
  });

  const previewScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.94]);
  const previewOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

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
    rotateY.set(x * 6);
    rotateX.set(y * -6);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section className="relative bg-background pt-24 pb-20 sm:pt-28 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[28px] border border-border shadow-xl lg:grid-cols-[minmax(260px,34%)_1fr]">
          <OrbitPanel />

          <div className="relative flex flex-col justify-between gap-12 bg-navy p-8 sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='0.5'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#8FB8FF] uppercase"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#8FB8FF]" />
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#8FB8FF] motion-reduce:hidden" />
                </span>
                Real-time logistics
              </motion.div>

              <motion.h1
                variants={headlineContainer}
                initial="hidden"
                animate="show"
                className="mt-5 max-w-lg font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
              >
                {HEADLINE_LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-1">
                    <motion.span variants={headlineLine} className="block">
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 flex max-w-sm items-start gap-4"
              >
                <span className="mt-2 h-px w-10 shrink-0 bg-white/25" />
                <p className="text-sm leading-relaxed text-white/65">
                  Optimize your logistics operations from booking to delivery with one connected,
                  real-time platform built for Kenya&apos;s parcel networks.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <MagneticButton>
                  <Button
                    size="lg"
                    className="mt-8 h-11 gap-2 rounded-full px-6 text-sm"
                    nativeButton={false}
                    render={<Link href="/register" />}
                  >
                    Get started free
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>

            <div className="relative flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex -space-x-2.5">
                {AVATAR_INITIALS.map((initials) => (
                  <Avatar key={initials} className="border-2 border-navy">
                    <AvatarFallback className="bg-white/10 text-xs font-medium text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Join 12,500+ parcels tracked</p>
                <p className="text-xs text-white/50">
                  Trusted across Nairobi, Mombasa and Kisumu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={previewRef} className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale: previewScale, opacity: previewOpacity }}
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
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-navy shadow-xl"
          >
            <DashboardPreview />
          </motion.div>

          {FLOATING_CARDS.map(({ icon: Icon, label, value, className }) => (
            <FloatingCard key={label} icon={Icon} label={label} value={value} className={className} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OrbitPanel() {
  return (
    <div className="relative hidden min-h-[420px] overflow-hidden bg-muted p-8 lg:flex lg:flex-col lg:justify-end">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[34%] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy shadow-lg"
      >
        <Truck size={22} className="text-white" aria-hidden="true" />
      </div>

      {ORBIT_NODES.map(({ icon: Icon, style, live }, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm"
          style={style}
        >
          {live ? (
            <span className="absolute inset-0 -z-10 flex items-center justify-center">
              <span className="animate-pulse-ring absolute size-10 rounded-full bg-primary/40 motion-reduce:hidden" />
            </span>
          ) : null}
          <Icon size={16} className="text-primary" aria-hidden="true" />
        </div>
      ))}

      <div className="relative">
        <p className="font-heading text-base font-semibold text-foreground">
          Unified parcel
          <br />
          tracking platform
        </p>
      </div>
    </div>
  );
}

function FloatingCard({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: typeof Truck;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`animate-float absolute z-20 hidden items-center gap-2.5 rounded-[var(--radius-element)] border border-white/10 bg-navy/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex ${className}`}
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
                <div className="h-2 w-14 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-[var(--radius-element)] border border-white/10 bg-white/[0.04] p-3">
            <div className="h-2 w-14 rounded-full bg-white/15" />
            <div className="mt-3 flex items-end gap-1.5">
              {[40, 70, 55, 90, 65].map((h, i) => (
                <div key={i} className="w-full rounded-t bg-primary/50" style={{ height: `${h}%` }} />
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
