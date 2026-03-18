import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { getEmployeeById } from "@/app/(panel)/_shared/employee/employee.query";
import { getAllJobTitles } from "@/app/(panel)/_shared/job-title/job-title.query";
import { getAllTeamsByCompanyId } from "@/app/(panel)/_shared/team/team.query";
import { getEmployeeJobTitleHistoryAction } from "@/app/(panel)/organization/employee/_actions/employee-job-title.action";
import EmployeeForm from "@/app/(panel)/organization/employee/_components/employee-form";

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);

    const [employeeRes, companiesRes, deptsRes, teamsRes, jobTitlesRes, jobTitleHistoryRes] = await Promise.all([
        getEmployeeById(id),
        getAllCompanies(),
        getAllDepartments(),
        getAllTeamsByCompanyId(),
        getAllJobTitles(),
        getEmployeeJobTitleHistoryAction(id),
    ]);

    return (
        <main>
            <EmployeeForm
                initialData={employeeRes.data}
                companies={companiesRes.data || []}
                departments={deptsRes.data || []}
                teams={teamsRes.data || []}
                jobTitles={jobTitlesRes.data || []}
                jobTitleHistory={jobTitleHistoryRes.data || []}
            />
        </main>
    );
}
