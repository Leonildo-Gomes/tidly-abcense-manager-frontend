"use server";

import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments, getDepartmentById } from "@/app/(panel)/_shared/departments/department.query";
import { getAllEmployees } from "@/app/(panel)/_shared/employee/employee.query";
import { getDepartmentManagerHistoryAction } from "@/app/(panel)/organization/department/_actions/department-manager.action";
import DepartmentForm from "@/app/(panel)/organization/department/_components/department-form";

export default async function EditDepartmentPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    const [
        { data: department },
        { data: companies },
        { data: departments },
        { data: employees },
        { data: managerHistory },
    ] = await Promise.all([
        getDepartmentById(id),
        getAllCompanies(),
        getAllDepartments(),
        getAllEmployees(),
        getDepartmentManagerHistoryAction(id),
    ]);

    return (
        <main>
            <DepartmentForm
                initialData={department || null}
                companies={companies || []}
                departments={departments || []}
                employees={employees || []}
                managerHistory={managerHistory || []}
            />
        </main>
    );
}
