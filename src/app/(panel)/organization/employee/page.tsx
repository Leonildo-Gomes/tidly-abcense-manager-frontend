import EmployeeList from "@/app/(panel)/organization/employee/_components/employee-list";

export default function Employee() {
  return (
    <main className="min-h-screen p-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's workforce and roles.</p>
        </header>
        <EmployeeList />
      </div>
    </main>
  );
}