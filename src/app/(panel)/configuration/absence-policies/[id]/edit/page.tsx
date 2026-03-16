import { redirect } from "next/navigation";
import { PolicyForm } from "../../_components/policy-form";
import { getAbsencePolicyById } from "@/app/(panel)/_shared/absence-policy/absence-policy.query";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllAbsenceTypes } from "@/app/(panel)/_shared/absence-type/absence-type.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";

export default async function EditPolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [policyRes, companiesRes, typesRes, deptsRes] = await Promise.all([
    getAbsencePolicyById(id),
    getAllCompanies(),
    getAllAbsenceTypes(),
    getAllDepartments(),
  ]);

  if (!policyRes.success || !policyRes.data) {
    redirect("/configuration/absence-policies");
  }

  const companies = companiesRes.success ? companiesRes.data || [] : [];
  const absenceTypes = typesRes.success ? typesRes.data || [] : [];
  const departments = deptsRes.success ? deptsRes.data || [] : [];

  const initialData = {
    id: policyRes.data.id,
    companyId: policyRes.data.companyId,
    absenceTypeId: policyRes.data.absenceTypeId,
    departmentId: policyRes.data.departmentId,
    maxDaysPerYear: policyRes.data.maxDaysPerYear,
    minNoticeDays: policyRes.data.minNoticeDays,
  };

  return (
    <PolicyForm
      initialData={initialData}
      isEditMode
      companies={companies}
      absenceTypes={absenceTypes}
      departments={departments}
    />
  );
}
