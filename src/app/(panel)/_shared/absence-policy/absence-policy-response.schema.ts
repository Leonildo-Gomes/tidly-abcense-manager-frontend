import { z } from "zod";

export const absencePolicyResponseSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  absenceTypeId: z.string().uuid(),
  departmentId: z.string().uuid().nullable().optional(),
  maxDaysPerYear: z.number(),
  minNoticeDays: z.number(),
});

export type AbsencePolicyResponse = z.infer<typeof absencePolicyResponseSchema>;
