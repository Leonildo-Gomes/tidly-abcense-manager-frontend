import EmployeeForm from "@/app/(panel)/organization/employee/_components/employee-form";

// Mock fetch
const getEmployee = (id: string) => {
    return {
        id,
        name: "John Doe",
        email: "john.doe@acme.com",
        phone: "+1 555-0101",
        gender: "male" as const,
        companyId: "1",
        teamId: "1",
        startDate: new Date("2023-01-15"),
        status: "active" as const,
    };
};

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    const employee = getEmployee(id);

  return (
    <main>
      <EmployeeForm initialData={employee} />
    </main>
  );
}
