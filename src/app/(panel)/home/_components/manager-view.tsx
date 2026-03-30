// TODO: Replace MOCK_DEPARTMENT_ABSENCES with real data from getAbsencesByDepartment() when API is ready
import { Building2, Clock, Users, ChevronDown } from "lucide-react";
import { StatCard } from "./stat-card";
import { AbsenceTable, AbsenceRow } from "./absence-table";
import { PendingApprovalsWidget, PendingItem } from "./pending-approvals-widget";
import type { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TeamAbsenceGroup {
    teamId: string;
    teamName: string;
    rows: AbsenceRow[];
}

const MOCK_DEPARTMENT_ABSENCES: TeamAbsenceGroup[] = [
    {
        teamId: "t1",
        teamName: "Engineering",
        rows: [
            { id: "1", employeeName: "Bruno Coelho", absenceTypeName: "Sick Leave", startDate: "Mar 21", endDate: "Mar 22", totalDays: 2, status: "PENDING" },
            { id: "2", employeeName: "Cláudia Martins", absenceTypeName: "Personal", startDate: "Mar 25", endDate: "Mar 25", totalDays: 1, status: "APPROVED" },
            { id: "3", employeeName: "Filipe Ramos", absenceTypeName: "Sick Leave", startDate: "Mar 10", endDate: "Mar 12", totalDays: 3, status: "REJECTED" },
        ],
    },
    {
        teamId: "t2",
        teamName: "Product",
        rows: [
            { id: "4", employeeName: "Ana Ferreira", absenceTypeName: "Vacation", startDate: "Apr 07", endDate: "Apr 18", totalDays: 10, status: "PENDING" },
            { id: "5", employeeName: "Eva Lima", absenceTypeName: "Vacation", startDate: "May 12", endDate: "May 23", totalDays: 10, status: "APPROVED" },
        ],
    },
];

const MOCK_PENDING: PendingItem[] = MOCK_DEPARTMENT_ABSENCES
    .flatMap((g) => g.rows)
    .filter((a) => a.status === "PENDING")
    .map((a) => ({ id: a.id, employeeName: a.employeeName, absenceTypeName: a.absenceTypeName, totalDays: a.totalDays, startDate: a.startDate }));

interface ManagerViewProps {
    employee: EmployeeResponse;
}

export function ManagerView({ employee }: ManagerViewProps) {
    const totalTeams = MOCK_DEPARTMENT_ABSENCES.length;
    const totalEmployees = new Set(MOCK_DEPARTMENT_ABSENCES.flatMap((g) => g.rows.map((r) => r.employeeName))).size;
    const pendingCount = MOCK_PENDING.length;

    return (
        <div className="h-full flex flex-col font-sans">
            {/* Page Header */}
            <div className="px-6 py-5 border-b border-primary/8 bg-background/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-xl">
                        <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Department Overview</h1>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            Manager: {employee.name} · {employee.companyName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Teams" value={totalTeams} icon={Building2} iconColor="text-primary" />
                    <StatCard label="Employees with Absences" value={totalEmployees} icon={Users} iconColor="text-blue-500" />
                    <StatCard label="Pending Approvals" value={pendingCount} icon={Clock} iconColor="text-amber-500" />
                </div>

                {/* Two-column: teams sections + pending widget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Per-Team Collapsible Sections */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-base font-bold">Absences by Team</h2>
                        {MOCK_DEPARTMENT_ABSENCES.map((group) => (
                            <Collapsible key={group.teamId} defaultOpen>
                                <div className="rounded-2xl border border-primary/8 overflow-hidden">
                                    <CollapsibleTrigger className="w-full flex items-center justify-between px-5 py-3.5 bg-muted/20 hover:bg-muted/40 transition-colors group">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-bold">{group.teamName}</span>
                                            <span className="text-xs text-muted-foreground">
                                                ({group.rows.length} absence{group.rows.length !== 1 ? "s" : ""})
                                            </span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="p-4">
                                            <AbsenceTable rows={group.rows} emptyMessage="No absences for this team." />
                                        </div>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        ))}
                    </div>

                    {/* Pending Approvals Widget */}
                    <div>
                        <h2 className="text-base font-bold mb-3">Pending Leader Approvals</h2>
                        <PendingApprovalsWidget
                            items={MOCK_PENDING}
                            title="Pending Approvals"
                            subtitle="Awaiting leader action"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
