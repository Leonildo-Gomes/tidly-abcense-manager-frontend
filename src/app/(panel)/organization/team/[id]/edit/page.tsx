import TeamForm from "@/app/(panel)/organization/team/_components/team-form";

export default async function EditTeamPage({ params }: { params: { id: string } }) {
  // Safe param handling
  const { id } = await Promise.resolve(params);

  // Mock fetching data based on ID
  const mockData = {
    id,
    name: "Frontend Team",
    code: "FE-001",
    department: "Engineering",
    status: "active" as const,
  };

  return (
    <main>
      <TeamForm initialData={mockData} />
    </main>
  );
}
