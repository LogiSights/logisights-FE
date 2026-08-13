"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { roleForPath } from "@/lib/auth/roles";
import { Navbar } from "@/components/shared/navbar";
import { SidebarNav } from "@/components/shared/sidebar-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const requiredRole = roleForPath(pathname);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (requiredRole && user.role !== requiredRole) {
      router.replace("/");
    }
  }, [isHydrated, user, requiredRole, pathname, router]);

  if (!isHydrated || !user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-1">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card p-4 md:block">
        <SidebarNav role={user.role} />
      </aside>
      <div className="flex flex-1 flex-col">
        <Navbar role={user.role} />
        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
