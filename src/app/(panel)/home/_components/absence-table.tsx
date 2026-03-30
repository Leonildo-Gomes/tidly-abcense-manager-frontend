import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Inbox } from "lucide-react";

export type AbsenceStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AbsenceRow {
    id: string;
    employeeName: string;
    absenceTypeName: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    status: AbsenceStatus;
}

const STATUS_STYLES: Record<AbsenceStatus, { label: string; class: string; dot: string }> = {
    PENDING:  { label: "Pending",  class: "text-amber-600 bg-amber-50 border-amber-200",   dot: "bg-amber-500" },
    APPROVED: { label: "Approved", class: "text-emerald-600 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
    REJECTED: { label: "Rejected", class: "text-red-600 bg-red-50 border-red-200",        dot: "bg-red-500" },
};

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

interface AbsenceTableProps {
    rows: AbsenceRow[];
    emptyMessage?: string;
}

export function AbsenceTable({ rows, emptyMessage = "No absences found." }: AbsenceTableProps) {
    if (rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-14 text-muted-foreground">
                <Inbox className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-sm font-bold">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-primary/8 overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-muted/30 border-b border-primary/8">
                        <th className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3">Employee</th>
                        <th className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3">Type</th>
                        <th className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3 hidden sm:table-cell">Period</th>
                        <th className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3 hidden md:table-cell">Days</th>
                        <th className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        const s = STATUS_STYLES[row.status];
                        return (
                            <tr
                                key={row.id}
                                className={cn("border-b border-primary/5 transition-colors hover:bg-muted/20", i % 2 === 0 ? "bg-background" : "bg-muted/10")}
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <Avatar className="h-7 w-7 border border-primary/8 shrink-0">
                                            <AvatarFallback className="text-[10px] font-bold bg-primary/5 text-primary">
                                                {getInitials(row.employeeName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium truncate max-w-[120px]">{row.employeeName}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground text-xs">{row.absenceTypeName}</td>
                                <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                                    {row.startDate} → {row.endDate}
                                </td>
                                <td className="px-4 py-3 text-xs font-bold hidden md:table-cell">{row.totalDays}d</td>
                                <td className="px-4 py-3">
                                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border", s.class)}>
                                        <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                                        {s.label}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
