"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import {
  DetailSheet,
  DetailField,
  DetailFieldGrid,
  DetailSection,
} from "@/components/shared/detail-sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  adminSummary,
  adminUsers,
  deliveryTrend,
  statusBreakdown,
  systemServices,
  topCities,
  type AdminUser,
  type ServiceStatus,
} from "@/lib/mock/admin";
import type { Role } from "@/types/models";

const USER_ROLE_TABS: { label: string; value: Role | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Sender", value: "SENDER" },
  { label: "Driver", value: "DRIVER" },
  { label: "Pickup", value: "PICKUP" },
];

const SERVICE_STYLES: Record<ServiceStatus, { label: string; className: string }> = {
  operational: { label: "Operational", className: "bg-success/15 text-success border-success/30" },
  degraded: { label: "Degraded", className: "bg-warning/15 text-warning border-warning/30" },
  down: { label: "Down", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

function ServiceIcon({ status }: { status: ServiceStatus }) {
  if (status === "operational") return <CheckCircle2 size={16} className="text-success" aria-hidden="true" />;
  if (status === "degraded") return <AlertTriangle size={16} className="text-warning" aria-hidden="true" />;
  return <XCircle size={16} className="text-destructive" aria-hidden="true" />;
}

const CHART_TOOLTIP_STYLE = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-element)",
  fontSize: 12,
  color: "var(--popover-foreground)",
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Role | "ALL">("ALL");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = useMemo(
    () => (activeTab === "ALL" ? adminUsers : adminUsers.filter((user) => user.role === activeTab)),
    [activeTab]
  );

  const columns: DataTableColumn<AdminUser>[] = [
    { key: "name", header: "Name", accessor: (row) => row.name },
    { key: "email", header: "Email", accessor: (row) => row.email },
    { key: "role", header: "Role", accessor: (row) => <Badge variant="outline">{row.role}</Badge> },
    {
      key: "status",
      header: "Status",
      accessor: (row) => (
        <Badge
          variant="outline"
          className={
            row.status === "Active"
              ? "bg-success/15 text-success border-success/30"
              : "bg-destructive/15 text-destructive border-destructive/30"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
      sortValue: (row) => row.joined,
      accessor: (row) => format(new Date(row.joined), "d MMM yyyy"),
    },
    {
      key: "action",
      header: "",
      accessor: (row) => (
        <Button size="sm" variant="outline" onClick={() => setSelectedUser(row)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-xl font-semibold">Admin dashboard</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard stat={{ label: "Total users", value: adminSummary.totalUsers, icon: "Users" }} />
        <StatCard stat={{ label: "Active drivers", value: adminSummary.activeDrivers, icon: "Truck" }} />
        <StatCard stat={{ label: "Parcels today", value: adminSummary.parcelsToday, icon: "ClipboardList" }} />
        <StatCard stat={{ label: "Revenue today (Ksh)", value: adminSummary.revenueToday, icon: "Wallet" }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4 lg:col-span-2">
          <h2 className="mb-3 font-heading text-sm font-semibold">Deliveries (last 30 days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={deliveryTrend} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="deliveriesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
              <Area
                type="monotone"
                dataKey="deliveries"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#deliveriesFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4">
          <h2 className="mb-3 font-heading text-sm font-semibold">Status breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
              <Pie
                data={statusBreakdown}
                dataKey="value"
                nameKey="status"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {statusBreakdown.map((entry) => (
                  <Cell key={entry.status} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {statusBreakdown.map((entry) => (
              <li key={entry.status} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
                {entry.status}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4 lg:col-span-2">
          <h2 className="mb-3 font-heading text-sm font-semibold">Top cities by volume</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCities} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="city" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="volume" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-card p-4">
          <h2 className="mb-3 font-heading text-sm font-semibold">System health</h2>
          <ul className="flex flex-col gap-3">
            {systemServices.map((service) => (
              <li key={service.name} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm">
                  <ServiceIcon status={service.status} />
                  {service.name}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-xs font-medium",
                    SERVICE_STYLES[service.status].className
                  )}
                >
                  {SERVICE_STYLES[service.status].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-sm font-semibold">Users</h2>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Role | "ALL")}>
            <TabsList>
              {USER_ROLE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <DataTable
          columns={columns}
          data={filteredUsers}
          getRowId={(row) => row.id}
          searchable
          searchPlaceholder="Search by name or email"
          searchAccessor={(row) => `${row.name} ${row.email}`}
          emptyMessage="No users found."
        />
      </div>

      <DetailSheet
        open={selectedUser !== null}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        title={selectedUser?.name}
        description={selectedUser?.email}
      >
        {selectedUser && (
          <>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedUser.role}</Badge>
              <Badge
                variant="outline"
                className={
                  selectedUser.status === "Active"
                    ? "bg-success/15 text-success border-success/30"
                    : "bg-destructive/15 text-destructive border-destructive/30"
                }
              >
                {selectedUser.status}
              </Badge>
            </div>

            <DetailSection title="Account">
              <DetailFieldGrid>
                <DetailField label="Email" value={selectedUser.email} />
                <DetailField
                  label="Joined"
                  value={format(new Date(selectedUser.joined), "d MMM yyyy")}
                />
              </DetailFieldGrid>
            </DetailSection>
          </>
        )}
      </DetailSheet>
    </div>
  );
}
