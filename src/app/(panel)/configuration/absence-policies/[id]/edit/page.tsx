"use client";

import { useParams, useRouter } from "next/navigation";
import { PolicyForm } from "../../_components/policy-form";

export default function EditPolicyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Mock fetching data based on ID
  const mockInitialData = {
    id,
    company_id: "c1",
    absence_type_id: "at1",
    department_id: null, // General Rule
    max_days_per_year: 22.5,
    min_notice_days: 14,
  };

  return (
    <PolicyForm
      initialData={mockInitialData}
      isEditMode
    />
  );
}
