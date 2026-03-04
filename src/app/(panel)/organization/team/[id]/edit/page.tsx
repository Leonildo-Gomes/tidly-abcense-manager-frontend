"use server";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { getTeamById } from "@/app/(panel)/_shared/team/team.query";
import TeamForm from "@/app/(panel)/organization/team/_components/team-form";

export default async function EditTeamPage({ params }: { params: { id: string } }) {
  // Safe param handling
  const { id } = await Promise.resolve(params);

  const departmentsRes = await getAllDepartments();
  const departments = departmentsRes.data || [];
  const teamRes = await getTeamById(id);
  
  return (
    <main>
      <TeamForm initialData={teamRes.data} departments={departments} />
    </main>
  );
}
