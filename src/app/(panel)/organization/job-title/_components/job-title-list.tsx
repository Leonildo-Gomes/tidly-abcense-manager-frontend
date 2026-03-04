"use client";
import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import JobTitleGrid from "./job-title-grid";
import JobTitleTable from "./job-title-table";

export default function JobTitleList({ 
    jobTitles, 
    companies 
}: { 
    jobTitles: JobTitleResponse[]; 
    companies: CompanyResponse[] 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    // We would fire a mutator or server action here
    // router.refresh() 
  };

  const filteredJobTitles = jobTitles.filter((job) => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = companyFilter === "all" || job.companyName === companyFilter;

    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
            <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search job titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
            />
            </div>
            
            {/* Company Filter */}
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                    <SelectValue placeholder="Filter by Company" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map(company => (
                        <SelectItem key={company.id} value={company.name}>
                            {company.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button onClick={() => router.push("/organization/job-title/new")} className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus size={16} />
            Add Job Title
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <JobTitleTable
        jobTitles={filteredJobTitles}
        onToggleStatus={handleStatusToggle}
      />

      {/* Mobile Card View */}
      <JobTitleGrid
        jobTitles={filteredJobTitles}
        onToggleStatus={handleStatusToggle}
      />
      
      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <div>
            Showing {filteredJobTitles.length} of {jobTitles.length} job titles
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}
