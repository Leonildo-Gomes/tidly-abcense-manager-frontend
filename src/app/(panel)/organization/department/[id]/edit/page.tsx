import DepartmentForm from "@/app/(panel)/organization/department/_components/department-form";

// Mock fetch
const getDepartment = (id: string) => {
    return {
        id,
        name: "Engineering",
        code: "ENG",
        companyId: "1",
        parentId: undefined,
        status: "active" as const,
    };
};

export default async function EditDepartmentPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    const department = getDepartment(id);

  return (
    <main>
      <DepartmentForm initialData={department} />
    </main>
  );
}
