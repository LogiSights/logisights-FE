"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, MapPinned, Send, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/landing/magnetic-button";

const ROLES = [
  {
    icon: Send,
    title: "Senders",
    description: "Book parcels in seconds, track every delivery, and manage your spend.",
  },
  {
    icon: Truck,
    title: "Drivers",
    description: "See today's route, update status on the move, confirm handoffs.",
  },
  {
    icon: MapPinned,
    title: "Pickup agents",
    description: "Manage inbound and outbound parcels at your point, no paperwork.",
  },
  {
    icon: LayoutDashboard,
    title: "Admins",
    description: "Full operational visibility: drivers, revenue, exceptions, all live.",
  },
];

export function RoleCtas() {
  return (
    <section id="roles" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Built for your role
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One platform, four tailored views
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl"
            >
              <span
                className="flex size-11 items-center justify-center rounded-[var(--radius-element)] bg-primary/10 text-primary"
              >
                <role.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold">{role.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {role.description}
              </p>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 rounded-b-[var(--radius-card)] bg-primary transition-transform duration-300 group-hover:scale-x-100"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton>
            <Button
              size="lg"
              className="h-11 gap-2 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="/register" />}
            >
              Create your account
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
