"use server";

import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments, getDepartmentById } from "@/app/(panel)/_shared/departments/department.query";
import DepartmentForm from "@/app/(panel)/organization/department/_components/department-form";

export default async function EditDepartmentPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    const { data: department } = await getDepartmentById(id);
    const { data: companies } = await getAllCompanies();
    const { data: departments } = await getAllDepartments();

  return (
    <main>
      <DepartmentForm initialData={department || null} companies={companies || []} departments={departments || []} />
    </main>
  );
}
