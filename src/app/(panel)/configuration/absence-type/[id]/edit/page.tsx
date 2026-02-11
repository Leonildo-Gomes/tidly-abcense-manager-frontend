"use client";

import { useParams } from "next/navigation";
import AbsenceTypeForm from "../../_components/absence-type-form";

export default function EditAbsenceTypePage() {
  const params = useParams();
  const id = params.id as string;

  // In a real app, fetch data based on ID
  const mockData = {
    id,
    name: "Vacation",
    code: "VAC",
    category: "vacation" as const,
    unit: "days" as const,
    color: "#3b82f6",
    status: true,
  };

  return <AbsenceTypeForm initialData={mockData} isEditMode />;
}
