import z from "zod";

export const teamSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be at most 100 characters." }),
    code: z.string().min(2, { message: "Code must be at least 2 characters." }).max(15, { message: "Code must be at most 15 characters." }),
    departmentId: z.string().min(1, { message: "Department is required." }),
    status: z.boolean(),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
