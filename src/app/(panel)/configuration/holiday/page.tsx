import { getAllHolidays } from "../../_shared/holiday/holiday.query";
import HolidayList from "./_components/holiday-list";

export default async function HolidayPage() {
  const response = await getAllHolidays();
  const holidays = response.success ? response.data || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-serif font-bold text-foreground">
          Holidays
        </h1>
        <p className="text-muted-foreground">
          Manage public and company holidays for the organization.
        </p>
      </div>

      <HolidayList initialHolidays={holidays} />
    </div>
  );
}