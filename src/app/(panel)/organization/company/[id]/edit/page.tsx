import CompanyForm from "@/app/(panel)/organization/company/_components/company-form";

// Mock fetching data based on ID - in a real app this would be a db call
const getCompany = (id: string) => {
    // This is just a placeholder. In a real app, verify ID and fetch.
    return {
        id,
        name: "Acme Corp",
        code: "ACME-001",
        status: "active" as const,
    };
};

export default async function EditCompanyPage({ params }: { params: { id: string } }) {
    // In Next.js 15+, params is a promise, but in 14 it's an object. 
    // Assuming 14 based on usage patterns, but let's be safe with async.
    // Actually, in the latest Next.js canary (15), params need to be awaited. 
    // For now, standard way:
    const { id } = await Promise.resolve(params); 
    const company = getCompany(id);

  return (
    <main>
      <CompanyForm initialData={company} />
    </main>
  );
}
