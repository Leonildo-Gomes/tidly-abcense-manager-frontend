import CompanyForm from "@/app/(panel)/organization/company/_components/company-form";
import { Company } from "../../_components/types";
import { getCompanyById } from "../../_data-access/company.query";



export default async function EditCompanyPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params); 
    const company = await getCompanyById(id);
    const companies: Company = {
      id: company.data?.id,
      name: company.data?.name,
      code: company.data?.organizationNumber,
      status: company.data?.isActive ? "active" : "inactive",
      employees: 0,
    } as Company;

  return (
    <main>
      <CompanyForm initialData={companies} />
    </main>
  );
}
