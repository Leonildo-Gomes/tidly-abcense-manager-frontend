
import { z } from "zod";

const TeamResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    code: z.string(),
    departmentId: z.uuid(),
    departmentName: z.string(),
    status: z.boolean(),
});

export type TeamResponse = z.infer<typeof TeamResponseSchema>;