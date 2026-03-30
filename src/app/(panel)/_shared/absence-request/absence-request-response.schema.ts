import z from "zod";

export const absenceRequestStatusEnum = ["PENDING", "APPROVED", "REJECTED"] as const;
export type AbsenceRequestStatus = (typeof absenceRequestStatusEnum)[number];

const absenceRequestResponseSchema = z.object({
    id: z.string(),
    employeeId: z.string(),
    employeeName: z.string(),
    teamId: z.string(),
    teamName: z.string(),
    absenceTypeName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    totalDays: z.number(),
    status: z.enum(absenceRequestStatusEnum),
    createdAt: z.string(),
});

export type AbsenceRequestResponse = z.infer<typeof absenceRequestResponseSchema>;
