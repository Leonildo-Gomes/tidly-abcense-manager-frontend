import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { getEmployeeById } from "@/app/(panel)/_shared/employee/employee.query";
import { Gender } from "@/app/(panel)/_shared/employee/gender.enum";
import { getAllTeamsByCompanyId } from "@/app/(panel)/_shared/team/team.query";
import EmployeeForm from "@/app/(panel)/organization/employee/_components/employee-form";

// Mock fetch
const getEmployee = (id: string) => {
    return {
        id,
        name: "John Doe",
        email: "john.doe@acme.com",
        phone: "+1 555-0101",
        gender: Gender.MALE,
        companyId: "1",
        teamId: "1",
        startDate: new Date("2023-01-15"),
        status: "active" as const,
    };
};

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    const { data: employee } = await getEmployeeById(id);
    
    const [companiesRes, deptsRes, teamsRes] = await Promise.all([
        getAllCompanies(),
        getAllDepartments(),
        getAllTeamsByCompanyId()
    ]);

  return (
    <main>
      <EmployeeForm 
        initialData={employee} 
        companies={companiesRes.data || []}
        departments={deptsRes.data || []}
        teams={teamsRes.data || []}
      />
    </main>
  );
}
