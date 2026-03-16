import z from "zod";


const departmentResponseSchema = z.object({
    id: z.uuid(),
    name: z.string().min(2, { message: "Department name must be at least 2 characters." }).max(150, { message: "Department name must be at most 150 characters." }),
    code: z.string().min(2, { message: "Department code must be at least 2 characters." }).max(20, { message: "Department code must be at most 20 characters." }),
    companyId: z.uuid(),
    companyName: z.string(),
    parentDepartmentId: z.uuid().nullable().optional(),
    parentDepartmentName: z.string().nullable().optional(),
    currentManagerId: z.string().uuid().nullable().optional(),
    currentManagerName: z.string().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable().optional(),
    isActive: z.boolean(),
});

export type DepartmentResponse = z.infer<typeof departmentResponseSchema>;
