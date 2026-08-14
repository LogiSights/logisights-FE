"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/landing/count-up";

const STATS = [
  { label: "Parcels tracked", value: 12500, suffix: "+" },
  { label: "Cities covered", value: 3, suffix: "" },
  { label: "On-time delivery", value: 96, suffix: "%" },
  { label: "Active drivers", value: 32, suffix: "" },
];

export function TrustStats() {
  return (
    <section className="border-y border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="text-center"
            >
              <dd className="font-heading text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
