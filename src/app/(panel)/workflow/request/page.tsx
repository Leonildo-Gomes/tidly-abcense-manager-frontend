

import { getEmployeeByUserId } from "@/app/(panel)/_shared/employee/employee.query";
import AbsenceRequestSplitDashboard from "./_components/absence-request-split-dashboard";

export default async function AbsenceRequestPage() {
  const result = await getEmployeeByUserId();
  const employee = result.success ? result.data : null;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col items-start gap-1 py-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground/90 font-geist">Absence Request</h1>
        <p className="text-muted-foreground text-sm">
          Plan your time off and view team schedule context.
        </p>
      </div>

      <div className="min-h-[700px] animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both">
        <AbsenceRequestSplitDashboard employee={employee} />
      </div>
    </div>
  );
}