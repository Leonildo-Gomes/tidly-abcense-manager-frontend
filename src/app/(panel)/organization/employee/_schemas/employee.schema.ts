import * as z from "zod";

export const employeeSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(150, { message: "Name must be at most 150 characters." }),
    email: z.email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone must be at least 10 characters." }),
    gender: z.enum(["male", "female", "other"]).nonoptional({ message: "Gender is required." }),
    companyId: z.string().min(1, { message: "Company is required." }),
    teamId: z.string().min(1, { message: "Team is required." }),
    role: z.enum(["org:admin", "org:member"]),
    startDate: z.date().nonoptional({ message: "Start date is required." }),
    endDate: z.date().optional(),
    status: z.boolean(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;