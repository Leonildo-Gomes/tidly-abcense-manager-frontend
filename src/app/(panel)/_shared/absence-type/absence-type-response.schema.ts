import { z } from "zod";

export const absenceTypeResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    code: z.string(),
    color: z.string(),
    requiredAttachment: z.boolean().default(false),
    description: z.string().nullable().optional(),
    companyId: z.uuid().optional(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime().or(z.string()),
    updatedAt: z.string().datetime().nullable().optional().or(z.string().nullable().optional()),
});

export type AbsenceTypeResponse = z.infer<typeof absenceTypeResponseSchema>;
