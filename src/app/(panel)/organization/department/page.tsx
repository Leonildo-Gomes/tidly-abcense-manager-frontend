"use server";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import DepartmentList from "@/app/(panel)/organization/department/_components/department-list";

export default async function DepartmentPage() {
  const [departmentsResponse, companiesResponse] = await Promise.all([
    getAllDepartments(),
    getAllCompanies()
  ]);
  
  const departments = departmentsResponse.data?.map((department) => ({
    ...department
  }));

  const companies = companiesResponse.data || [];

  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's departments and hierarchy.</p>
        </header>
        <DepartmentList departments={departments || []} companies={companies} />
      </div>
    </main>
  );
}