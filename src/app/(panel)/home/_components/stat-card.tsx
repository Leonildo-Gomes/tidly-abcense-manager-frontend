import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    trend?: { value: string; positive?: boolean };
    className?: string;
}

export function StatCard({ label, value, icon: Icon, iconColor = "text-primary", trend, className }: StatCardProps) {
    return (
        <div className={cn("bg-background rounded-2xl border border-primary/8 p-5 flex items-start gap-4 shadow-sm", className)}>
            <div className={cn("p-2.5 rounded-xl bg-muted/50 shrink-0", iconColor)}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                <p className="text-2xl font-bold tracking-tight">{value}</p>
                {trend && (
                    <p className={cn("text-xs font-medium mt-1", trend.positive ? "text-emerald-600" : "text-red-500")}>
                        {trend.value}
                    </p>
                )}
            </div>
        </div>
    );
}
