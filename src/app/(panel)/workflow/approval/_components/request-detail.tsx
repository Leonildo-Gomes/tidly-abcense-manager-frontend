"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock,
    FileQuestion,
    MessageSquare,
    X,
    XCircle
} from "lucide-react";
import { useState } from "react";
import type { AbsenceRequest, RequestStatus } from "./mock-data";
import { STATUS_CONFIG, TYPE_CONFIG } from "./mock-data";

interface RequestDetailProps {
  request: AbsenceRequest | null;
  onAction: (id: string, action: "approved" | "rejected", comment?: string) => void;
}

function MiniCalendar({ startDate, endDate }: { startDate: Date; endDate: Date }) {
  const month = startDate;
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <div className="rounded-md border border-primary/8 overflow-hidden">
      <div className="bg-muted/30 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-primary/8">
        {format(month, "MMMM yyyy")}
      </div>
      <div className="grid grid-cols-7 text-center">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="py-1.5 text-[9px] font-bold text-muted-foreground/60 uppercase">{d}</div>
        ))}
        {days.map((day) => {
          const inRange = day >= startDate && day <= endDate;
          const isStart = isSameDay(day, startDate);
          const isEnd = isSameDay(day, endDate);
          const inMonth = isSameMonth(day, month);
          const isTodayDate = isToday(day);
          return (
            <div
              key={day.toString()}
              className={cn(
                "py-1.5 text-[11px] font-medium transition-colors",
                !inMonth && "text-muted-foreground/20",
                inRange && inMonth && "bg-primary/8 text-primary font-bold",
                (isStart || isEnd) && "bg-primary text-primary-foreground font-bold rounded-sm",
                isTodayDate && !inRange && "text-primary underline decoration-dotted"
              )}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RequestDetail({ request, onAction }: RequestDetailProps) {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [actionLoading, setActionLoading] = useState<"approved" | "rejected" | null>(null);

  const handleAction = async (action: "approved" | "rejected") => {
    if (!request) return;
    setActionLoading(action);
    await new Promise((r) => setTimeout(r, 800));
    onAction(request.id, action, comment || undefined);
    setComment("");
    setShowComment(false);
    setActionLoading(null);
  };

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <FileQuestion className="h-16 w-16 mb-4 opacity-20" />
        <p className="font-bold text-sm">Select a request to review</p>
        <p className="text-xs opacity-60 mt-1">Click on any request from the list.</p>
      </div>
    );
  }

  const typeCfg = TYPE_CONFIG[request.type];
  const statusCfg = STATUS_CONFIG[request.status];
  const isPending = request.status === "pending";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={request.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full overflow-y-auto"
      >
        {/* Top: Employee Info */}
        <div className="p-8 border-b border-primary/8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/10 shadow-sm">
                <AvatarImage src={request.employee.avatar} />
                <AvatarFallback className="bg-primary/5 text-primary font-bold text-lg">
                  {request.employee.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{request.employee.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    {request.employee.role}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {request.employee.department}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <span className={cn(
              "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border",
              statusCfg.color
            )}>
              <span className={cn("h-2 w-2 rounded-full", statusCfg.dot)} />
              {statusCfg.label}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 space-y-8">
          {/* Type + Duration row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md bg-muted/30 border border-primary/8 p-4 text-center">
              <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-1 text-muted-foreground")}>Type</div>
              <div className={cn("text-sm font-bold", typeCfg.color)}>{typeCfg.label}</div>
            </div>
            <div className="rounded-md bg-muted/30 border border-primary/8 p-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-muted-foreground">Duration</div>
              <div className="text-sm font-bold text-foreground">{request.days} day{request.days > 1 ? "s" : ""}</div>
            </div>
            <div className="rounded-md bg-muted/30 border border-primary/8 p-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-muted-foreground">Submitted</div>
              <div className="text-sm font-bold text-foreground">{format(request.submittedAt, "MMM d")}</div>
            </div>
          </div>

          <Separator className="bg-primary/6" />

          {/* Date range */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Period</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 rounded-md bg-muted/30 border border-primary/8 p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">From</div>
                <div className="font-bold text-base">{format(request.startDate, "EEE, MMM d")}</div>
                <div className="text-xs text-muted-foreground">{format(request.startDate, "yyyy")}</div>
              </div>
              <div className="text-muted-foreground/40 font-bold">→</div>
              <div className="flex-1 rounded-md bg-muted/30 border border-primary/8 p-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">To</div>
                <div className="font-bold text-base">{format(request.endDate, "EEE, MMM d")}</div>
                <div className="text-xs text-muted-foreground">{format(request.endDate, "yyyy")}</div>
              </div>
            </div>
            <MiniCalendar startDate={request.startDate} endDate={request.endDate} />
          </div>

          {/* Reason */}
          {request.reason && (
            <>
              <Separator className="bg-primary/6" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reason</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 rounded-md border border-primary/8 p-4">
                  {request.reason}
                </p>
              </div>
            </>
          )}

          {/* Rejection comment (if already rejected) */}
          {request.status === "rejected" && request.comment && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">Manager Note</span>
              </div>
              <p className="text-sm text-red-700">{request.comment}</p>
            </div>
          )}

          {/* Action Area — only for pending */}
          {isPending && (
            <>
              <Separator className="bg-primary/6" />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Your Decision</span>
                </div>

                {/* Optional comment toggle */}
                <button
                  onClick={() => setShowComment(!showComment)}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  {showComment ? "Hide comment" : "Add a comment (optional)"}
                </button>

                <AnimatePresence>
                  {showComment && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Textarea
                        placeholder="Leave a note for the employee..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="resize-none min-h-[80px] rounded-md border-primary/10 bg-muted/20 text-sm focus-visible:ring-primary/20"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAction("rejected")}
                    disabled={!!actionLoading}
                    className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold tracking-wide transition-all"
                  >
                    {actionLoading === "rejected" ? (
                      <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4 animate-pulse" /> Rejecting...</span>
                    ) : (
                      <span className="flex items-center gap-2"><X className="h-4 w-4" /> Reject</span>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAction("approved")}
                    disabled={!!actionLoading}
                    className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
                  >
                    {actionLoading === "approved" ? (
                      <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 animate-pulse" /> Approving...</span>
                    ) : (
                      <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Approve</span>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
