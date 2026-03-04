import z from "zod";
import { Gender } from "./gender.enum";
import { Role } from "./role.enum";


const EmployeeResponseSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.enum(Gender),
    companyId: z.string(),
    companyName: z.string(),
    teamId: z.string(),
    teamName: z.string(),
    role: z.enum(Role),
    startDate: z.date(),
    endDate: z.date().optional(),
    status: z.boolean(),
});

export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>;