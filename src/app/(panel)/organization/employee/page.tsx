"use server";
import { getAllEmployees } from "@/app/(panel)/_shared/employee/employee.query";
import EmployeeList from "@/app/(panel)/organization/employee/_components/employee-list";
import { auth } from "@clerk/nextjs/server";

export default async function Employee() {
   const { userId } = await auth();
      if (!userId) {
          throw new Error("Unauthorized");
      }
  const employees = await getAllEmployees();
  return (
    <main className="min-h-screen p-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's workforce and roles.</p>
        </header>
        <EmployeeList employees={employees.data || []} />
      </div>
    </main>
  );
}