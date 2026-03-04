"use server";
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import CompanyList from "@/app/(panel)/organization/company/_components/company-list";

export default async function CompanyPage() {
  const { data: companies } = await getAllCompanies();
  
  
 
   
  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's companies and subsidiaries.</p>
        </header>
        <CompanyList companies={companies || []} />
      </div>
    </main>
  );
}