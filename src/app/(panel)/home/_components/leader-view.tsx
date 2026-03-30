// TODO: Replace MOCK_TEAM_ABSENCES with real data from getAbsencesByTeamId(employee.teamId) when API is ready
import { Users, Clock, CalendarCheck } from "lucide-react";
import { StatCard } from "./stat-card";
import { AbsenceTable, AbsenceRow } from "./absence-table";
import { PendingApprovalsWidget, PendingItem } from "./pending-approvals-widget";
import type { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";

const MOCK_TEAM_ABSENCES: AbsenceRow[] = [
    { id: "1", employeeName: "Ana Ferreira", absenceTypeName: "Vacation", startDate: "Apr 07", endDate: "Apr 18", totalDays: 10, status: "PENDING" },
    { id: "2", employeeName: "Bruno Coelho", absenceTypeName: "Sick Leave", startDate: "Mar 21", endDate: "Mar 22", totalDays: 2, status: "PENDING" },
    { id: "3", employeeName: "Cláudia Martins", absenceTypeName: "Personal", startDate: "Mar 25", endDate: "Mar 25", totalDays: 1, status: "APPROVED" },
    { id: "4", employeeName: "Daniel Santos", absenceTypeName: "Remote Work", startDate: "Apr 01", endDate: "Apr 05", totalDays: 5, status: "APPROVED" },
    { id: "5", employeeName: "Eva Lima", absenceTypeName: "Vacation", startDate: "May 12", endDate: "May 23", totalDays: 10, status: "REJECTED" },
];

const MOCK_PENDING: PendingItem[] = MOCK_TEAM_ABSENCES
    .filter((a) => a.status === "PENDING")
    .map((a) => ({ id: a.id, employeeName: a.employeeName, absenceTypeName: a.absenceTypeName, totalDays: a.totalDays, startDate: a.startDate }));

interface LeaderViewProps {
    employee: EmployeeResponse;
}

export function LeaderView({ employee }: LeaderViewProps) {
    const teamMembersCount = new Set(MOCK_TEAM_ABSENCES.map((a) => a.employeeName)).size;
    const pendingCount = MOCK_PENDING.length;
    const thisMonthApproved = MOCK_TEAM_ABSENCES.filter((a) => a.status === "APPROVED").length;

    return (
        <div className="h-full flex flex-col font-sans">
            {/* Page Header */}
            <div className="px-6 py-5 border-b border-primary/8 bg-background/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-xl">
                        <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Team Overview</h1>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {employee.teamName} · Leader: {employee.name.split(" ")[0]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Team Members" value={teamMembersCount} icon={Users} iconColor="text-primary" />
                    <StatCard label="Pending Approvals" value={pendingCount} icon={Clock} iconColor="text-amber-500" />
                    <StatCard label="Approved This Month" value={thisMonthApproved} icon={CalendarCheck} iconColor="text-emerald-500" />
                </div>

                {/* Two-column layout: table + widget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Team Absence Table */}
                    <div className="lg:col-span-2">
                        <h2 className="text-base font-bold mb-3">Team Absences</h2>
                        <AbsenceTable rows={MOCK_TEAM_ABSENCES} emptyMessage="No absences found for your team." />
                    </div>

                    {/* Pending Approvals Widget */}
                    <div>
                        <h2 className="text-base font-bold mb-3">Awaiting Action</h2>
                        <PendingApprovalsWidget items={MOCK_PENDING} subtitle="Requires your approval" />
                    </div>
                </div>
            </div>
        </div>
    );
}
