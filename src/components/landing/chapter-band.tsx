"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, MapPinned, Send, Truck } from "lucide-react";

const HEADLINE = "One parcel. Four roles. Zero blind spots.";

const MOMENTS = [
  {
    step: "01",
    icon: Send,
    role: "Sender",
    title: "Books in seconds",
    description:
      "A sender opens the wizard, drops a pin, and the parcel gets a tracking ID before the courier even leaves the lot.",
  },
  {
    step: "02",
    icon: Truck,
    role: "Driver",
    title: "Picks up and moves",
    description:
      "The route lands on the driver's phone. Every stop updates live, no radio calls, no guesswork.",
  },
  {
    step: "03",
    icon: MapPinned,
    role: "Pickup agent",
    title: "Hands off clean",
    description:
      "Inbound and outbound parcels get scanned at the point, so nothing sits in a back room unaccounted for.",
  },
  {
    step: "04",
    icon: LayoutDashboard,
    role: "Admin",
    title: "Watches it all",
    description:
      "Volume, exceptions, and on-time rate sit in one dashboard, updated the moment anything changes downstream.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: "0.4em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ChapterBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='0.5'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1">
              <motion.span variants={word} className="inline-block">
                {w}
                {i < HEADLINE.split(" ").length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <p className="mt-6 max-w-xl text-base text-white/60">
          The same lifecycle, four different windows into it. Scroll to see a parcel move
          through every role that touches it.
        </p>
      </div>

      <div className="relative mt-14 pl-4 sm:pl-6 lg:pl-8">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-4 sm:pr-6 lg:pr-8">
          {MOMENTS.map((moment) => (
            <div
              key={moment.step}
              className="flex w-[78vw] shrink-0 snap-start flex-col rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 sm:w-[360px]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-[var(--radius-element)] bg-primary/20 text-[#8FB8FF]">
                  <moment.icon size={20} aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-semibold text-white/30">
                  {moment.step}
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-[#8FB8FF] uppercase">
                {moment.role}
              </p>
              <h3 className="mt-1.5 font-heading text-xl font-semibold text-white">
                {moment.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{moment.description}</p>
            </div>
          ))}

          <div className="w-px shrink-0 sm:w-2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
