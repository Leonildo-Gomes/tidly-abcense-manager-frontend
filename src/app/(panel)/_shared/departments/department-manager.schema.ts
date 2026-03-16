import z from "zod";

// --- Response schema for a single history entry (from the API) ---
const departmentManagerHistoryResponseSchema = z.object({
    id: z.uuid(),
    departmentId: z.uuid(),
    managerId: z.uuid(),
    managerName: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable().optional(),
});

export type DepartmentManagerHistoryResponse = z.infer<typeof departmentManagerHistoryResponseSchema>;

// --- Form schema for assigning a new manager ---
export const assignManagerSchema = z.object({
    managerId: z.uuid({ message: "Please select a manager." }),
    departmentId: z.uuid({ message: "Department ID is required." }),
    startDate: z
        .date()
        .refine((d) => d !== undefined && d !== null, { message: "Start date is required." })
        .refine((d) => d >= new Date(new Date().setHours(0, 0, 0, 0)), {
            message: "Start date must be today or in the future.",
        }),
});

export type AssignManagerFormValues = z.infer<typeof assignManagerSchema>;
