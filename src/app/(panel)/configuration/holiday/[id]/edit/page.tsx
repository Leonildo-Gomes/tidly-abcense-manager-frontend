import { redirect } from "next/navigation";
import { getHolidayById } from "@/app/(panel)/_shared/holiday/holiday.query";
import HolidayForm from "../../_components/holiday-form";

export default async function EditHolidayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getHolidayById(id);

  if (!response.success || !response.data) {
    redirect("/configuration/holiday");
  }

  const holidayToEdit = {
    id: response.data.id,
    name: response.data.name,
    date: new Date(response.data.date),
    type: response.data.type,
    isRecurring: response.data.isRecurring,
    status: response.data.isActive,
  };

  return <HolidayForm initialData={holidayToEdit} isEditMode />;
}
