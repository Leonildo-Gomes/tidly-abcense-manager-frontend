"use server";
import { apiServer } from '@/lib/axios-server';
import { auth } from '@clerk/nextjs/server';
import { AbsenceTypeFormValues, absenceTypeSchema } from "../_schemas/absence-type.schema";

export async function createAbsenceType(data: AbsenceTypeFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        console.log("data", data);
        const schema = absenceTypeSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }

        const payload = {
            name: data.name,
            code: data.code,
            color: data.color,
            requiresAttachment: data.requiredAttachment,
            description: data.description,
            isActive: data.status,
        };
        const response = await apiServer.post("/v1/absence-types", payload);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || error.message };
    }
}



export async function updateAbsenceType(id: string, data: AbsenceTypeFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const schema = absenceTypeSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }
        const payload = {
            name: data.name,
            code: data.code,
            color: data.color,
            requiresAttachment: data.requiredAttachment,
            description: data.description,
            isActive: data.status,
        };
        const response = await apiServer.put(`/v1/absence-types/${id}`, payload);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || error.message };
    }
}
