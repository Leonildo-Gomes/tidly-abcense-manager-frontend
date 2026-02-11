import DepartmentList from "@/app/(panel)/organization/department/_components/department-list";

export default function DepartmentPage() {
  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's departments and hierarchy.</p>
        </header>
        <DepartmentList />
      </div>
    </main>
  );
}