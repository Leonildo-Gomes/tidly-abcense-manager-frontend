import { z } from "zod";

export const absenceRequestSchema = z.object({
  absenceTypeId: z.string().min(1, "Select an absence type"),
  referenceYear: z.number().min(2000, "Select a valid year"),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  totalDays: z.number().min(1, "At least 1 day is required"),
  comment: z.string().optional(),
});

export type AbsenceRequestFormData = z.infer<typeof absenceRequestSchema>;
