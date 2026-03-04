import { getAllCompanies } from "@/app/(panel)/_shared/company/company.query";
import { getJobTitleById } from "@/app/(panel)/_shared/job-title/job-title.query";
import JobTitleForm from "../../_components/job-title-form";

export default async function EditJobTitlePage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);

  const [companiesRes, jobTitleRes] = await Promise.all([
     getAllCompanies(),
     getJobTitleById(id)
  ]);

  return (
    <main>
      <JobTitleForm 
        initialData={jobTitleRes.data} 
        companies={companiesRes.data || []} 
      />
    </main>
  );
}
