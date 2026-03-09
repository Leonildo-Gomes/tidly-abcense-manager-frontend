import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
import { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { TeamResponse } from "@/app/(panel)/_shared/team/team-response.schema";

export interface EmployeeFormProps {
    initialData?: EmployeeResponse | null;
    companies: CompanyResponse[];
    departments: DepartmentResponse[];
    teams: TeamResponse[];
}