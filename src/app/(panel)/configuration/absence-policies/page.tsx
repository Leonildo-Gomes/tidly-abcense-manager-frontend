
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PolicyList } from "./_components/policy-list";
import { getAllAbsencePolicies } from "@/app/(panel)/_shared/absence-policy/absence-policy.query";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllAbsenceTypes } from "@/app/(panel)/_shared/absence-type/absence-type.query";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";

export default async function AbsencePoliciesPage() {
  const [policiesRes, companiesRes, typesRes, deptsRes] = await Promise.all([
    getAllAbsencePolicies(),
    getAllCompanies(),
    getAllAbsenceTypes(),
    getAllDepartments(),
  ]);

  const rawPolicies = policiesRes.success ? policiesRes.data || [] : [];
  const companies = companiesRes.success ? companiesRes.data || [] : [];
  const types = typesRes.success ? typesRes.data || [] : [];
  const departments = deptsRes.success ? deptsRes.data || [] : [];

  const mappedPolicies = rawPolicies.map((p) => {
    const comp = companies.find((c) => c.id === p.companyId);
    const type = types.find((t) => t.id === p.absenceTypeId);
    const dept = p.departmentId ? departments.find((d) => d.id === p.departmentId) : null;

    return {
      id: p.id,
      companyName: comp?.name || "Unknown Company",
      absenceTypeName: type?.name || "Unknown Type",
      departmentName: dept?.name || null,
      maxDaysPerYear: p.maxDaysPerYear,
      minNoticeDays: p.minNoticeDays,
    };
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Absence Policies</h2>
        <Button asChild>
          <Link href="/configuration/absence-policies/new">
            <Plus className="mr-2 h-4 w-4" /> New Policy
          </Link>
        </Button>
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-4">
        <PolicyList initialPolicies={mappedPolicies} />
      </div>
    </div>
  );
}
