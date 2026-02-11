"use client";

import { useParams } from "next/navigation";
import HolidayForm from "../../_components/holiday-form";

export default function EditHolidayPage() {
  const params = useParams();
  const id = params.id as string;

  // In a real app, fetch data based on ID
  const mockData = {
    id,
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    isRecurring: true,
    type: "public" as const, // Cast to literal type
    status: true,
  };

  return <HolidayForm initialData={mockData} isEditMode />;
}
