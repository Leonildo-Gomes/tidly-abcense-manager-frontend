import z from "zod";

// --- Response schema for a single leader history entry (from the API) ---
const teamLeaderHistoryResponseSchema = z.object({
    id: z.uuid(),
    teamId: z.uuid(),
    leaderId: z.uuid(),
    leaderName: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable().optional(),
});

export type TeamLeaderHistoryResponse = z.infer<typeof teamLeaderHistoryResponseSchema>;

// --- Form schema for assigning a new leader ---
export const assignLeaderSchema = z.object({
    leaderId: z.uuid({ message: "Please select a leader." }),
    teamId: z.uuid({ message: "Team ID is required." }),
    startDate: z
        .date()
        .refine((d) => d !== undefined && d !== null, { message: "Start date is required." })
        .refine((d) => d >= new Date(new Date().setHours(0, 0, 0, 0)), {
            message: "Start date must be today or in the future.",
        }),
});

export type AssignLeaderFormValues = z.infer<typeof assignLeaderSchema>;
