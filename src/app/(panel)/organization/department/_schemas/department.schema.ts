import z from "zod";

export const departmentSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be at most 100 characters." }),
    code: z.string().min(2, { message: "Code must be at least 2 characters." }).max(15, { message: "Code must be at most 15 characters." }),
    companyId: z.string().min(1, { message: "Company is required." }),
    parentId: z.string().optional(),
    status: z.boolean(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;
