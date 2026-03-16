import { HolidayType } from "@/app/(panel)/_shared/holiday/holiday-type.enum";
import { z } from "zod";

export const holidaySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be less than 100 characters." }),
  date: z.date(),
  type: z.enum(HolidayType),
  isRecurring: z.boolean(),
  status: z.boolean(),
});

export type HolidayFormValues = z.infer<typeof holidaySchema>;
