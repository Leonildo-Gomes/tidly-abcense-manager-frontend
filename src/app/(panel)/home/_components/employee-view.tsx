// TODO: Replace MOCK_EMPLOYEE_ABSENCES with real data from getMyAbsences() when API is ready
import { CalendarDays, Clock, CheckCircle2, User } from "lucide-react";
import { StatCard } from "./stat-card";
import { AbsenceTable, AbsenceRow } from "./absence-table";
import type { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";

const MOCK_EMPLOYEE_ABSENCES: AbsenceRow[] = [
    { id: "1", employeeName: "You", absenceTypeName: "Vacation", startDate: "Apr 07", endDate: "Apr 18", totalDays: 10, status: "APPROVED" },
    { id: "2", employeeName: "You", absenceTypeName: "Sick Leave", startDate: "Mar 21", endDate: "Mar 22", totalDays: 2, status: "PENDING" },
    { id: "3", employeeName: "You", absenceTypeName: "Personal", startDate: "Feb 10", endDate: "Feb 10", totalDays: 1, status: "APPROVED" },
];

interface EmployeeViewProps {
    employee: EmployeeResponse;
}

export function EmployeeView({ employee }: EmployeeViewProps) {
    const pendingCount = MOCK_EMPLOYEE_ABSENCES.filter((a) => a.status === "PENDING").length;
    const approvedDays = MOCK_EMPLOYEE_ABSENCES.filter((a) => a.status === "APPROVED").reduce((s, a) => s + a.totalDays, 0);

    return (
        <div className="h-full flex flex-col font-sans">
            {/* Page Header */}
            <div className="px-6 py-5 border-b border-primary/8 bg-background/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-xl">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Hello, {employee.name.split(" ")[0]} 👋</h1>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {employee.teamName} · {employee.companyName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard
                        label="Total Days Used"
                        value={`${approvedDays}d`}
                        icon={CalendarDays}
                        iconColor="text-primary"
                    />
                    <StatCard
                        label="Pending Requests"
                        value={pendingCount}
                        icon={Clock}
                        iconColor="text-amber-500"
                    />
                    <StatCard
                        label="Account Status"
                        value={employee.isActive ? "Active" : "Inactive"}
                        icon={CheckCircle2}
                        iconColor={employee.isActive ? "text-emerald-500" : "text-red-500"}
                    />
                </div>

                {/* Absence History */}
                <div>
                    <h2 className="text-base font-bold mb-3">My Absences</h2>
                    <AbsenceTable rows={MOCK_EMPLOYEE_ABSENCES} emptyMessage="You have no absences recorded." />
                </div>
            </div>
        </div>
    );
}
