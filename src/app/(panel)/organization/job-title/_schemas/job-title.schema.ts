import z from "zod";

export const jobTitleSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be at most 100 characters." }),
    description: z.string().optional(),
    companyId: z.string().min(1, { message: "Company is required." }),
    status: z.boolean(),
});

export type JobTitleFormValues = z.infer<typeof jobTitleSchema>;
