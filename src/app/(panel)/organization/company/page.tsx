import CompanyList from "@/app/(panel)/organization/company/_components/company-list";


export default function Company() {
  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's companies and subsidiaries.</p>
        </header>
        <CompanyList />
      </div>
    </main>
  );
}