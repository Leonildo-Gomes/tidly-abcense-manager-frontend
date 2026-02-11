"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AbsenceTypeGrid from "./absence-type-grid";
import AbsenceTypeTable from "./absence-type-table";
import { AbsenceType } from "./types";

// Mock Data
const initialAbsenceTypes: AbsenceType[] = [
  {
    id: "1",
    name: "Vacation",
    code: "VAC",
    category: "vacation",
    unit: "days",
    status: "active",
    color: "#3b82f6", // Blue
  },
  {
    id: "2",
    name: "Sick Leave",
    code: "SICK",
    category: "sick",
    unit: "days",
    status: "active",
    color: "#ef4444", // Red
  },
  {
    id: "3",
    name: "Remote Work",
    code: "RMT",
    category: "other",
    unit: "days",
    status: "active",
    color: "#10b981", // Green
  },
  {
    id: "4",
    name: "Doctor Appointment",
    code: "DOC",
    category: "sick",
    unit: "hours",
    status: "active",
    color: "#f59e0b", // Amber
  },
  {
    id: "5",
    name: "Unpaid Leave",
    code: "UNP",
    category: "other",
    unit: "days",
    status: "inactive",
    color: "#6b7280", // Gray
  },
];

export default function AbsenceTypeList() {
  const [absenceTypes, setAbsenceTypes] =
    useState<AbsenceType[]>(initialAbsenceTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    setAbsenceTypes((prev) =>
      prev.map((type) =>
        type.id === id
          ? {
              ...type,
              status: type.status === "active" ? "inactive" : "active",
            }
          : type
      )
    );
  };

  const filteredTypes = absenceTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search absence types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={() => router.push("/configuration/absence-type/new")}
            className="gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Absence Type</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <AbsenceTypeTable
        absenceTypes={filteredTypes}
        onToggleStatus={handleStatusToggle}
      />

      {/* Mobile Card View */}
      <AbsenceTypeGrid
        absenceTypes={filteredTypes}
        onToggleStatus={handleStatusToggle}
      />

      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
        <div>
          Showing {filteredTypes.length} of {absenceTypes.length} types
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
