"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import CompanyGrid from "./company-grid";
import CompanyTable from "./company-table";
import { Company } from "./types";
// Mock data
const initialCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corp",
    code: "ACME-001",
    status: "active",
    employees: 120,
    logo: "/avatars/acme.png",
  },
  {
    id: "2",
    name: "Globex Corporation",
    code: "GLBX-202",
    status: "active",
    employees: 450,
  },
  {
    id: "3",
    name: "Soylent Corp",
    code: "SYLT-999",
    status: "inactive",
    employees: 50,
  },
  {
    id: "4",
    name: "Initech",
    code: "INIT-420",
    status: "active",
    employees: 12,
  },
  {
    id: "5",
    name: "Umbrella Corp",
    code: "UMB-666",
    status: "active",
    employees: 3000,
  },
];

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id
          ? {
              ...company,
              status: company.status === "active" ? "inactive" : "active",
            }
          : company
      )
    );
    toast.success("Company status updated successfully!");
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
           <Button  onClick={() => router.push("/organization/company/new")} className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus size={16} />
            Add Company
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <CompanyTable 
        companies={filteredCompanies} 
        onToggleStatus={handleStatusToggle} 
      />

      {/* Mobile Card View */}
      <CompanyGrid 
        companies={filteredCompanies} 
        onToggleStatus={handleStatusToggle} 
      />
      
      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <div>
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}