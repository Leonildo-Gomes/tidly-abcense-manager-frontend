"use client";

import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
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
import DepartmentGrid from "./department-grid";
import DepartmentTable from "./department-table";

export default function DepartmentList({
  departments,
  companies,
}: {
  departments: DepartmentResponse[];
  companies: CompanyResponse[];
}) {
  //const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    /*setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              status: dept.status === "active" ? "inactive" : "active",
            }
          : dept
      )
    );*/
  };

  const getCompanyName = (id: string) => companies.find(c => c.id === id)?.name || "Unknown";
  const getParentName = (id?: string) => departments.find(d => d.id === id)?.name || "-";

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = companyFilter === "all" || dept.companyId === companyFilter;

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
                placeholder="Search departments..."
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
                        <SelectItem key={company.id} value={company.id}>
                            {company.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button onClick={() => router.push("/organization/department/new")} className="gap-2 bg-primary text-white hover:bg-primary/90">
            <Plus size={16} />
            Add Department
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <DepartmentTable
        departments={filteredDepartments}
        getCompanyName={getCompanyName}
        getParentName={getParentName}
        onToggleStatus={handleStatusToggle}
      />

      {/* Mobile Card View */}
      <DepartmentGrid
        departments={filteredDepartments}
        getCompanyName={getCompanyName}
        getParentName={getParentName}
        onToggleStatus={handleStatusToggle}
      />
      
      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <div>
            Showing {filteredDepartments.length} of {departments.length} departments
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}
