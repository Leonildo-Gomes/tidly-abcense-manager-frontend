"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HolidayGrid from "./holiday-grid";
import HolidayTable from "./holiday-table";
import { Holiday } from "./types";

// Mock Data
const initialHolidays: Holiday[] = [
  {
    id: "1",
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    isRecurring: true,
    type: "public",
    status: "active",
  },
  {
    id: "2",
    name: "Easter Monday",
    date: new Date(new Date().getFullYear(), 3, 1), // Varies
    isRecurring: false,
    type: "public",
    status: "active",
  },
  {
    id: "3",
    name: "Labour Day",
    date: new Date(new Date().getFullYear(), 4, 1),
    isRecurring: true,
    type: "public",
    status: "active",
  },
  {
    id: "4",
    name: "Company Anniversary",
    date: new Date(new Date().getFullYear(), 8, 15),
    isRecurring: true,
    type: "company",
    status: "active",
  },
  {
    id: "5",
    name: "Christmas Day",
    date: new Date(new Date().getFullYear(), 11, 25),
    isRecurring: true,
    type: "public",
    status: "active",
  },
];

export default function HolidayList() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatusToggle = (id: string) => {
    setHolidays((prev) =>
      prev.map((holiday) =>
        holiday.id === id
          ? {
              ...holiday,
              status: holiday.status === "active" ? "inactive" : "active",
            }
          : holiday
      )
    );
  };

  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search holidays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={() => router.push("/configuration/holiday/new")}
            className="gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Holiday</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <HolidayTable
        holidays={filteredHolidays}
        onToggleStatus={handleStatusToggle}
      />

      {/* Mobile Card View */}
      <HolidayGrid
        holidays={filteredHolidays}
        onToggleStatus={handleStatusToggle}
      />

      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
        <div>
          Showing {filteredHolidays.length} of {holidays.length} holidays
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
