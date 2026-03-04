import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import JobTitleForm from "../_components/job-title-form";

export default async function NewJobTitlePage() {
  const companiesRes = await getAllCompanies();
  const companies = companiesRes.data || [];

  return (
    <main>
      <JobTitleForm companies={companies} />
    </main>
  );
}
