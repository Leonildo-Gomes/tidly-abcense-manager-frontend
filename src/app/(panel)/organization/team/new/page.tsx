import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import TeamForm from "@/app/(panel)/organization/team/_components/team-form";

export default async function NewTeamPage() {
  const departmentsRes = await getAllDepartments();
  const departments = departmentsRes.data || [];

  return (
    <main>
      <TeamForm departments={departments} />
    </main>
  );
}
