import z from "zod";

// --- Response schema for a single job title history entry (from the API) ---
const employeeJobTitleHistoryResponseSchema = z.object({
    id: z.uuid(),
    employeeId: z.uuid(),
    jobTitleId: z.uuid(),
    jobTitleName: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable().optional(),
});

export type EmployeeJobTitleHistoryResponse = z.infer<typeof employeeJobTitleHistoryResponseSchema>;

// --- Form schema for assigning a new job title ---
export const assignJobTitleSchema = z.object({
    jobTitleId: z.uuid({ message: "Please select a job title." }),
    employeeId: z.uuid({ message: "Employee ID is required." }),
    startDate: z
        .date()
        .refine((d) => d !== undefined && d !== null, { message: "Start date is required." })
        .refine((d) => d >= new Date(new Date().setHours(0, 0, 0, 0)), {
            message: "Start date must be today or in the future.",
        }),
});

export type AssignJobTitleFormValues = z.infer<typeof assignJobTitleSchema>;
