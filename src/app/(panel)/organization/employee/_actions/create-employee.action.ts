"use server";
import { apiServer } from '@/lib/axios-server';
import { auth } from '@clerk/nextjs/server';
import { EmployeeFormValues, employeeSchema } from "../_schemas/employee.schema";
export async function createEmployee(data: EmployeeFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        console.log("Creating employee:", data);
        const schema = employeeSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }
        const payload = {
            userId: userId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            companyId: data.companyId,
            teamId: data.teamId,
            role: data.role,
            startDate: data.startDate,
            endDate: data.endDate,
            isActive: data.status,
        }
        const response = await apiServer.post("/v1/employees", payload);

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error creating employee:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}
export async function updateEmployee(id: string, data: EmployeeFormValues) {
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
        const payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            companyId: data.companyId,
            teamId: data.teamId,
            role: data.role,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status,
        }
        const response = await apiServer.put(`/v1/employees/${id}`, payload);

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error updating employee:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}
