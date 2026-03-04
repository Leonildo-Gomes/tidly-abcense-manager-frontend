import { z } from "zod";

export const jobTitleResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().nullable().optional(),
    companyId: z.uuid(),
    companyName: z.string(),
    status: z.boolean(),
});

export type JobTitleResponse = z.infer<typeof jobTitleResponseSchema>;
