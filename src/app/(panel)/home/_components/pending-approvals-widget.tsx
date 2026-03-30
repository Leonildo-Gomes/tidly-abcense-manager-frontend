import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Clock, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PendingItem {
    id: string;
    employeeName: string;
    absenceTypeName: string;
    totalDays: number;
    startDate: string;
}

interface PendingApprovalsWidgetProps {
    items: PendingItem[];
    title?: string;
    subtitle?: string;
}

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function PendingApprovalsWidget({ items, title = "Pending Approvals", subtitle }: PendingApprovalsWidgetProps) {
    return (
        <div className="bg-background rounded-2xl border border-primary/8 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-primary/8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <h3 className="text-sm font-bold">{title}</h3>
                    {items.length > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-bold">
                            {items.length}
                        </span>
                    )}
                </div>
                {subtitle && (
                    <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
                )}
            </div>

            {/* List */}
            <div className="divide-y divide-primary/5">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Inbox className="h-7 w-7 mb-2 opacity-30" />
                        <p className="text-xs font-bold">All caught up!</p>
                    </div>
                ) : (
                    items.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/20 transition-colors">
                            <Avatar className="h-8 w-8 border border-primary/8 shrink-0">
                                <AvatarFallback className="text-[10px] font-bold bg-primary/5 text-primary">
                                    {getInitials(item.employeeName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{item.employeeName}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {item.absenceTypeName} · {item.totalDays}d · from {item.startDate}
                                </p>
                            </div>
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
                <div className="px-5 py-3 border-t border-primary/8 bg-muted/10">
                    <Link
                        href="/workflow/approval"
                        className={cn(
                            "flex items-center gap-1.5 text-xs font-bold text-primary hover:underline transition-colors"
                        )}
                    >
                        View all in Approval Workflow
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            )}
        </div>
    );
}
