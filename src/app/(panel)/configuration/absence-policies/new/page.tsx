"use server";

import { getAllAbsenceTypes } from "@/app/(panel)/_shared/absence-type/absence-type.query";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { PolicyForm } from "../_components/policy-form";

export default async function NewPolicyPage() {
  const [companiesRes, typesRes, deptsRes] = await Promise.all([
    getAllCompanies(),
    getAllAbsenceTypes(),
    getAllDepartments(),
  ]);

  const companies = companiesRes.success ? companiesRes.data || [] : [];
  const absenceTypes = typesRes.success ? typesRes.data || [] : [];
  const departments = deptsRes.success ? deptsRes.data || [] : [];

  console.log("companies", companies);
  console.log("absenceTypes", absenceTypes);
  console.log("departments", departments);

  return <PolicyForm companies={companies} absenceTypes={absenceTypes} departments={departments} />;
}
