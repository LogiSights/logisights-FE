"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CircleDashed, PackageCheck, PackageX, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    status: "PENDING",
    title: "Booked & queued",
    description:
      "A sender books a parcel through the wizard. It's assigned a tracking ID and queued for pickup.",
    icon: CircleDashed,
    color: "#F59E0B",
  },
  {
    status: "IN_TRANSIT",
    title: "Out for delivery",
    description:
      "A driver picks it up and the route updates live. Sender and admin both see it move in real time.",
    icon: Truck,
    color: "#1A6BFF",
  },
  {
    status: "DELIVERED",
    title: "Confirmed delivered",
    description:
      "Proof of delivery lands the moment it's handed off. The parcel's history closes out automatically.",
    icon: PackageCheck,
    color: "#22C55E",
  },
  {
    status: "FAILED",
    title: "Exceptions surfaced",
    description:
      "If a delivery can't complete, it's flagged instantly for dispatch to resolve. Nothing sits silently.",
    icon: PackageX,
    color: "#EF4444",
  },
] as const;

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={cn("relative bg-background", prefersReducedMotion ? "" : "lg:h-[320vh]")}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-0">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              One parcel, one status, four roles watching
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              The same lifecycle your team already uses, from booking through delivery,
              visualized live for everyone on the platform.
            </p>
          </div>

          <div className="relative mt-16">
            {/* connecting rail */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-border lg:left-1/2 lg:right-0 lg:top-1/2 lg:bottom-auto lg:h-px lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2">
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden="true"
                  style={{ scaleX: progressScale, scaleY: progressScale }}
                  className="h-full w-full origin-left bg-primary lg:origin-left"
                />
              )}
            </div>

            <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((step, i) => (
                <StepCard key={step.status} step={step} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex gap-4 lg:flex-col lg:gap-0 lg:text-center"
    >
      <div
        className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-md lg:mx-auto"
        style={{ backgroundColor: `${step.color}1A`, color: step.color }}
      >
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="lg:mt-5">
        <span
          className="text-[10px] font-semibold tracking-[0.15em] uppercase"
          style={{ color: step.color }}
        >
          {step.status.replace("_", " ")}
        </span>
        <h3 className="mt-1 font-heading text-base font-semibold">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground lg:mx-auto lg:max-w-[220px]">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}
