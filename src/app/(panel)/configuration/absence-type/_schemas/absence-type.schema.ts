import { z } from "zod";

export const absenceTypeSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    code: z.string().min(2, { message: "Code must be at least 2 characters." }),
    color: z.string().min(1, { message: "Color is required." }),
    required_attachment: z.boolean(),
    description: z.string().optional(),
    status: z.boolean(),
});

export type AbsenceTypeFormValues = z.infer<typeof absenceTypeSchema>;
