"use server";
import { getAllDepartments } from "@/app/(panel)/_shared/departments/department.query";
import { getAllEmployees } from "@/app/(panel)/_shared/employee/employee.query";
import { getTeamById } from "@/app/(panel)/_shared/team/team.query";
import { getTeamLeaderHistoryAction } from "@/app/(panel)/organization/team/_actions/team-leader.action";
import TeamForm from "@/app/(panel)/organization/team/_components/team-form";

export default async function EditTeamPage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);

  const [departmentsRes, teamRes, employeesRes, leaderHistoryRes] = await Promise.all([
    getAllDepartments(),
    getTeamById(id),
    getAllEmployees(),
    getTeamLeaderHistoryAction(id),
  ]);

  return (
    <main>
      <TeamForm
        initialData={teamRes.data}
        departments={departmentsRes.data || []}
        employees={employeesRes.data || []}
        leaderHistory={leaderHistoryRes.data || []}
      />
    </main>
  );
}
