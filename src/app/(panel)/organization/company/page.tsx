import CompanyList from "@/app/(panel)/organization/company/_components/company-list";
import { Company } from "./_components/types";
import { getAllCompanies } from "./_data-access/company.query";

export default async function CompanyPage() {
  const response = await getAllCompanies();
  console.log("companyResponses", response);
  
  // Mapear CompanyResponse para o type Company usado na UI
  const companies: Company[] = response.data?.map((res) => ({
    id: res.id,
    name: res.name,
    code: res.organizationNumber,
    status: res.isActive ? "active" : "inactive", // Valores por defeito pois a API não os inclui
    employees: 0,
  })) || [];
   
  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's companies and subsidiaries.</p>
        </header>
        <CompanyList companies={companies} />
      </div>
    </main>
  );
}