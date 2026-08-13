"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  accessor: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchAccessor?: (row: T) => string;
  emptyMessage?: string;
  filters?: React.ReactNode;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T>({
  columns,
  data,
  getRowId,
  searchable = false,
  searchPlaceholder = "Search",
  searchAccessor,
  emptyMessage = "No results.",
  filters,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim() || !searchAccessor) return data;
    const needle = query.trim().toLowerCase();
    return data.filter((row) => searchAccessor(row).toLowerCase().includes(needle));
  }, [data, query, searchable, searchAccessor]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;
    const column = columns.find((c) => c.key === sortKey);
    if (!column?.sortValue) return filtered;
    const factor = sortDirection === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const aValue = column.sortValue!(a);
      const bValue = column.sortValue!(b);
      if (aValue < bValue) return -1 * factor;
      if (aValue > bValue) return 1 * factor;
      return 0;
    });
  }, [filtered, sortKey, sortDirection, columns]);

  function toggleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }
    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }
    setSortKey(null);
    setSortDirection(null);
  }

  return (
    <div className="flex flex-col gap-3">
      {(searchable || filters) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {searchable && (
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={16}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
              />
            </div>
          )}
          {filters}
        </div>
      )}
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs font-medium text-muted-foreground">
              {columns.map((column) => (
                <th key={column.key} className={cn("px-4 py-3", column.className)}>
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      {column.header}
                      {sortKey === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUp size={14} aria-hidden="true" />
                        ) : (
                          <ArrowDown size={14} aria-hidden="true" />
                        )
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row) => (
                <tr
                  key={getRowId(row)}
                  className="border-b border-border last:border-0 hover:bg-muted/40"
                >
                  {columns.map((column) => (
                    <td key={column.key} className={cn("px-4 py-3", column.className)}>
                      {column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
