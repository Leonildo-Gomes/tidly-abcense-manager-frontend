"use client";

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
import EmployeeGrid from "./employee-grid";
import EmployeeTable from "./employee-table";
import { Employee } from "./types";

// Mock Data
const companies = [
    { id: "1", name: "Acme Corp" },
    { id: "2", name: "Globex Corp" },
];

const teams = [
    { id: "1", name: "Engineering", companyId: "1" },
    { id: "2", name: "Sales", companyId: "2" },
];


export default function EmployeeList ( { employees }: { employees: Employee[] } ) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const router = useRouter();


  const handleStatusToggle = (id: string) => {
    
  };

  const getCompanyName = (id: string) => companies.find(c => c.id === id)?.name || "Unknown";
  const getTeamName = (id: string) => teams.find(t => t.id === id)?.name || "Unknown";

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = companyFilter === "all" || emp.companyId === companyFilter;

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
                placeholder="Search employees..."
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
          <Button onClick={() => router.push("/organization/employee/new")} className="gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <EmployeeTable 
        employees={filteredEmployees}
        getCompanyName={getCompanyName}
        getTeamName={getTeamName}
        onToggleStatus={handleStatusToggle}
      />

      {/* Mobile Card View */}
      <EmployeeGrid
        employees={filteredEmployees}
        getCompanyName={getCompanyName}
        getTeamName={getTeamName}
        onToggleStatus={handleStatusToggle}
      />
      
      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <div>
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}
