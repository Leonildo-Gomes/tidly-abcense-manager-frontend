"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HolidayGrid from "./holiday-grid";
import HolidayTable from "./holiday-table";
import { HolidayResponse } from "@/app/(panel)/_shared/holiday/holiday-response.schema";
import { toast } from "sonner";
import { updateHoliday } from "../_actions/holiday.action";

interface HolidayListProps {
  initialHolidays: HolidayResponse[];
}

export default function HolidayList({ initialHolidays }: HolidayListProps) {
  const [holidays, setHolidays] = useState<HolidayResponse[]>(initialHolidays);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleStatusToggle = async (id: string) => {
    const holidayToUpdate = holidays.find((h) => h.id === id);
    if (!holidayToUpdate) return;

    const newStatus = !holidayToUpdate.isActive;
    
    // Optimistic UI update
    setHolidays((prev) =>
      prev.map((holiday) =>
        holiday.id === id ? { ...holiday, isActive: newStatus } : holiday
      )
    );

    try {
      const response = await updateHoliday(id, {
        name: holidayToUpdate.name,
        date: new Date(holidayToUpdate.date),
        type: holidayToUpdate.type,
        isRecurring: holidayToUpdate.isRecurring,
        status: newStatus,
      });

      if (!response.success) {
        // Revert on error
        setHolidays((prev) =>
          prev.map((holiday) =>
            holiday.id === id ? { ...holiday, isActive: !newStatus } : holiday
          )
        );
        toast.error(response.error || "Failed to update holiday status");
      } else {
        toast.success(`Holiday ${newStatus ? 'activated' : 'deactivated'}`);
        router.refresh();
      }
    } catch (error) {
      // Revert on error
      setHolidays((prev) =>
        prev.map((holiday) =>
          holiday.id === id ? { ...holiday, isActive: !newStatus } : holiday
        )
      );
      toast.error("Failed to update holiday status");
    }
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
