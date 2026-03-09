"use server";

import { getAbsenceTypeById } from "@/app/(panel)/_shared/absence-type/absence-type.query";
import AbsenceTypeForm from "../../_components/absence-type-form";

export default async function EditAbsenceTypePage({ params }: { params: { id: string } }) {
  const { id } = await Promise.resolve(params);
  const absenceType = await getAbsenceTypeById(id);
  return <AbsenceTypeForm initialData={absenceType.data} isEditMode />;
}
