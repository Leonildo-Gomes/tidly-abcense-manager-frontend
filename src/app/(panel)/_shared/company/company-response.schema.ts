import { z } from "zod";

export const companyResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    organizationNumber: z.string(),
    clerkOrgId: z.string().nullable().optional(),
    status: z.boolean(),
    createdAt: z.string().datetime().or(z.string()),
    updatedAt: z.string().datetime().nullable().optional().or(z.string().nullable().optional()),
});

export type CompanyResponse = z.infer<typeof companyResponseSchema>;
