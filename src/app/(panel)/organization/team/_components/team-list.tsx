"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TeamGrid from "./team-grid";
import TeamTable from "./team-table";
import { Team } from "./types";

// Mock Data
const initialTeams: Team[] = [
  {
    id: "1",
    name: "Frontend Team",
    code: "FE-001",
    department: "Engineering",
    status: "active",
    members: 8,
  },
  {
    id: "2",
    name: "Backend Team",
    code: "BE-001",
    department: "Engineering",
    status: "active",
    members: 12,
  },
  {
    id: "3",
    name: "Product Design",
    code: "PD-002",
    department: "Product",
    status: "active",
    members: 5,
  },
  {
    id: "4",
    name: "Enterprise Sales",
    code: "SLS-ENT",
    department: "Sales",
    status: "active",
    members: 20,
  },
  {
    id: "5",
    name: "Brand Marketing",
    code: "MKT-BRD",
    department: "Marketing",
    status: "inactive",
    members: 4,
  },
];

const departments = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Human Resources",
];

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === id
          ? {
              ...team,
              status: team.status === "active" ? "inactive" : "active",
            }
          : team
      )
    );
  };

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
        departmentFilter === "all" || team.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2 w-full sm:max-w-xl">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white"
                />
            </div>
            
            {/* Department Filter */}
            <div className="w-[180px]">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="bg-white">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Filter size={16} />
                            <span className="text-foreground">
                                {departmentFilter === "all" ? "All Departments" : departmentFilter}
                            </span>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                                {dept}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {departmentFilter !== "all" && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setDepartmentFilter("all")}
                    className="text-gray-500 hover:text-red-500"
                    title="Clear filter"
                >
                    <X size={16} />
                </Button>
            )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button  onClick={() => router.push("/organization/team/new")} className="gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                <div className="flex items-center justify-center w-full gap-2">
                    <span>Add Team</span>
                </div>
            </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <TeamTable teams={filteredTeams} onToggleStatus={handleStatusToggle} />

      {/* Mobile Card View */}
      <TeamGrid teams={filteredTeams} onToggleStatus={handleStatusToggle} />
      
      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <div>
            Showing {filteredTeams.length} of {teams.length} teams
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}
