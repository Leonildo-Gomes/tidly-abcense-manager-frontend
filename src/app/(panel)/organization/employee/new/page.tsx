import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { getAllTeamsByCompanyId } from "@/app/(panel)/_shared/team/team.query";
import EmployeeForm from "@/app/(panel)/organization/employee/_components/employee-form";

export default async function NewEmployeePage() {
    const [companiesRes, deptsRes, teamsRes] = await Promise.all([
        getAllCompanies(),
        getAllDepartments(),
        getAllTeamsByCompanyId(),
    ]);

    return (
        <main>
            <EmployeeForm
                companies={companiesRes.data || []}
                departments={deptsRes.data || []}
                teams={teamsRes.data || []}
            />
        </main>
    );
}
