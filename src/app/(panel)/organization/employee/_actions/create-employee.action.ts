import { auth } from '@clerk/nextjs/server';
import { EmployeeFormValues, employeeSchema } from "../_schemas/employee.schema";

export async function createEmployee(data: EmployeeFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const schema = employeeSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }


        return {
            success: true,
            data: schema.data
        };
    } catch (error) {
        console.error("Error creating employee:", error);
        return {
            success: false,
            error: "Error creating employee"
        };
    }
}