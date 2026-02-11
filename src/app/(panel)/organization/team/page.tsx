import TeamList from "@/app/(panel)/organization/team/_components/team-list";

export default function Team() {
  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Teams</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's teams and their department assignments.</p>
        </header>
        <TeamList />
      </div>
    </main>
  );
}