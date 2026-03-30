import { getEmployeeByUserId } from "@/app/(panel)/_shared/employee/employee.query";
import { Role } from "../_shared/employee/role.enum";
import { EmployeeView } from "./_components/employee-view";
import { LeaderView } from "./_components/leader-view";
import { ManagerView } from "./_components/manager-view";

export default async function Home() {
    const result = await getEmployeeByUserId();

    if (!result.success || !result.data) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm font-medium">
                Unable to load your data. Please try again later.
            </div>
        );
    }

    const employee = result.data;
    
    switch (employee.role) {
        case Role.LEADER:
            return <LeaderView employee={employee} />;
        case Role.MANAGER:
        case Role.ADMIN:
            return <ManagerView employee={employee} />;
        case Role.EMPLOYEE:
        case Role.MEMBER:
        default:
            return <EmployeeView employee={employee} />;
    }
    
}