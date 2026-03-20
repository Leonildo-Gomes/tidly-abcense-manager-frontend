"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { RequestDetail } from "./_components/request-detail";
import { RequestList } from "./_components/request-list";
import { MOCK_REQUESTS, type AbsenceRequest, type RequestStatus } from "./_components/mock-data";

export default function AbsenceApproval() {
  const [requests, setRequests] = useState<AbsenceRequest[]>(MOCK_REQUESTS);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_REQUESTS[0]?.id ?? null);
  const [activeFilter, setActiveFilter] = useState<RequestStatus | "all">("all");

  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null;

  const handleAction = (id: string, action: "approved" | "rejected", comment?: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: action, comment: comment }
          : r
      )
    );

    const req = requests.find((r) => r.id === id);
    if (!req) return;

    if (action === "approved") {
      toast.success(`Approved ${req.employee.name}'s request`, {
        description: `${req.days} day(s) of ${req.type} starting ${req.startDate.toLocaleDateString()}.`,
      });
    } else {
      toast.error(`Rejected ${req.employee.name}'s request`, {
        description: comment ? `Note: "${comment}"` : "No additional comment.",
      });
    }

    // Auto-advance to next pending request
    const nextPending = requests.find((r) => r.id !== id && r.status === "pending");
    if (nextPending) {
      setSelectedId(nextPending.id);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col font-sans">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-6 py-5 border-b border-primary/8 bg-background/80 backdrop-blur-sm flex items-center justify-between shrink-0"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Absence Approval</h1>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">
            Review and act on team absence requests.
          </p>
        </div>

        {/* Stats summary row */}
        <div className="hidden sm:flex items-center gap-6">
          {(["pending", "approved", "rejected"] as RequestStatus[]).map((status) => {
            const count = requests.filter((r) => r.status === status).length;
            const colors: Record<RequestStatus, string> = {
              pending: "text-amber-600",
              approved: "text-emerald-600",
              rejected: "text-red-600",
            };
            return (
              <div key={status} className="text-center">
                <div className={`text-2xl font-bold tracking-tighter ${colors[status]}`}>{count}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground capitalize">
                  {status}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Master-Detail Split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Request List */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-[340px] xl:max-w-[380px] shrink-0 overflow-hidden flex flex-col"
        >
          <RequestList
            requests={requests}
            selectedId={selectedId}
            onSelect={(req) => setSelectedId(req.id)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Right — Request Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 overflow-hidden bg-muted/3"
        >
          <RequestDetail
            request={selectedRequest}
            onAction={handleAction}
          />
        </motion.div>
      </div>
    </div>
  );
}