"use server";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import DepartmentForm from "@/app/(panel)/organization/department/_components/department-form";

export default async function NewDepartmentPage() {
  const { data: companies } = await getAllCompanies();
  const { data: departments } = await getAllDepartments();

  return (
    <main>
      <DepartmentForm companies={companies || []} departments={departments || []} />
    </main>
  );
}
