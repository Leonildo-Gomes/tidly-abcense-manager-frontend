import z from "zod";



export const companySchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }).max(150, {
        message: "Company name must be at most 150 characters.",
    }),
    code: z.string().min(2, {
        message: "Company code must be at least 2 characters.",
    }).max(20, {
        message: "Company code must be at most 20 characters.",
    }),
    status: z.boolean(),
    logo: z.any().optional(), // Allow File or string
});

export type CompanyFormValues = z.infer<typeof companySchema>;