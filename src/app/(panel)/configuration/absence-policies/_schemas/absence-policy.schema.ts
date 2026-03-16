import { z } from "zod";

export const policyFormSchema = z.object({
  companyId: z.string().min(1, { message: "Company is required." }),
  absenceTypeId: z.string().min(1, { message: "Absence Type is required." }),
  departmentId: z.string().nullable().optional(), // Null means General Rule
  maxDaysPerYear: z.number().min(0, { message: "Must be a positive number." }),
  minNoticeDays: z.number().int().min(0, { message: "Must be a positive integer." }),
});

export type PolicyFormValues = z.infer<typeof policyFormSchema>;
