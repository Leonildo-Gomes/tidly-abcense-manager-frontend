"use server"
import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getAllJobTitles } from "@/app/(panel)/_shared/job-title/job-title.query";
import JobTitleList from "./_components/job-title-list";

export default async function JobTitlePage() {
  const [jobTitlesResponse, companiesResponse] = await Promise.all([
    getAllJobTitles(),
    getAllCompanies()
  ]);

  return (
    <main>
      <div className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-serif font-bold text-foreground">Job Titles</h1>
          <p className="text-muted-foreground mt-2">Manage your organization's roles and responsibilities.</p>
        </header>
        <JobTitleList 
            jobTitles={jobTitlesResponse.data || []} 
            companies={companiesResponse.data || []} 
        />
      </div>
    </main>
  );
}
