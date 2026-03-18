import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
import { EmployeeJobTitleHistoryResponse } from "@/app/(panel)/_shared/employee/employee-job-title.schema";
import { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
import { TeamResponse } from "@/app/(panel)/_shared/team/team-response.schema";

export interface EmployeeFormProps {
    initialData?: EmployeeResponse | null;
    companies: CompanyResponse[];
    departments: DepartmentResponse[];
    teams: TeamResponse[];
    jobTitles?: JobTitleResponse[];
    jobTitleHistory?: EmployeeJobTitleHistoryResponse[];
}