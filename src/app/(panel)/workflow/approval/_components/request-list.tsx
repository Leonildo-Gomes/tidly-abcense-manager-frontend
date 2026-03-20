"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { AbsenceRequest, RequestStatus } from "./mock-data";
import { STATUS_CONFIG, TYPE_CONFIG } from "./mock-data";

interface RequestListProps {
  requests: AbsenceRequest[];
  selectedId: string | null;
  onSelect: (request: AbsenceRequest) => void;
  activeFilter: RequestStatus | "all";
  onFilterChange: (filter: RequestStatus | "all") => void;
}

const FILTERS: { key: RequestStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export function RequestList({ requests, selectedId, onSelect, activeFilter, onFilterChange }: RequestListProps) {
  const [search, setSearch] = useState("");

  const filtered = requests.filter((r) => {
    const matchFilter = activeFilter === "all" || r.status === activeFilter;
    const matchSearch = r.employee.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col h-full border-r border-primary/8">
      {/* Header */}
      <div className="p-6 border-b border-primary/8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Requests</h2>
            <p className="text-xs text-muted-foreground font-medium">
              {pendingCount > 0 ? `${pendingCount} awaiting your decision` : "All caught up!"}
            </p>
          </div>
          {pendingCount > 0 && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold shadow-sm shadow-amber-200">
              {pendingCount}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          <Input
            placeholder="Search by employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 rounded-md bg-muted/30 border-primary/8 text-sm focus-visible:ring-primary/20"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-muted/30 p-1 rounded-md border border-primary/8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={cn(
                "flex-1 text-[11px] font-bold uppercase tracking-wide py-1.5 rounded-sm transition-all duration-200",
                activeFilter === f.key
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full py-24 text-muted-foreground"
            >
              <Inbox className="h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm font-bold">No requests found</p>
              <p className="text-xs opacity-60 mt-1">Try changing the filter or search.</p>
            </motion.div>
          ) : (
            filtered.map((req, i) => {
              const statusCfg = STATUS_CONFIG[req.status];
              const typeCfg = TYPE_CONFIG[req.type];
              const isSelected = selectedId === req.id;

              return (
                <motion.button
                  key={req.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => onSelect(req)}
                  className={cn(
                    "w-full text-left p-4 border-b border-primary/5 transition-all duration-200 relative group",
                    isSelected
                      ? "bg-primary/4 border-l-2 border-l-primary"
                      : "hover:bg-muted/40 border-l-2 border-l-transparent"
                  )}
                >
                  {req.status === "pending" && (
                    <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  )}

                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9 shrink-0 border border-primary/8">
                      <AvatarImage src={req.employee.avatar} />
                      <AvatarFallback className="text-xs font-bold bg-primary/5 text-primary">
                        {req.employee.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold truncate">{req.employee.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border", typeCfg.bg, typeCfg.color)}>
                          {typeCfg.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {req.days} day{req.days > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          {format(req.startDate, "MMM d")} → {format(req.endDate, "MMM d")}
                        </span>
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full border flex items-center gap-1", statusCfg.color)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dot)} />
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
