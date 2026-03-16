import { z } from "zod";
import { HolidayType } from "./holiday-type.enum";

export const holidayResponseSchema = z.object({
    id: z.uuid(),
    companyId: z.uuid().optional(),
    name: z.string(),
    date: z.string().datetime().or(z.string()), // usually comes as yyyy-MM-dd
    type: z.enum(HolidayType),
    isRecurring: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.string().datetime().nullable().optional().or(z.string().nullable().optional()),
    updatedAt: z.string().datetime().nullable().optional().or(z.string().nullable().optional()),
});

export type HolidayResponse = z.infer<typeof holidayResponseSchema>;
