"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AbsenceTypeResponse } from "@/app/(panel)/_shared/absence-type/absence-type-response.schema";
import AbsenceTypeGrid from "./absence-type-grid";
import AbsenceTypeTable from "./absence-type-table";

export default function AbsenceTypeList({ absenceTypes }: { absenceTypes: AbsenceTypeResponse[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    // In a real scenario, this would trigger a Server Action
    // updateAbsenceTypeStatus(id, newStatus).then(() => router.refresh())
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
