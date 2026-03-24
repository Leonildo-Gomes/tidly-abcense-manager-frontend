"use server";
import { apiServer } from '@/lib/axios-server';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import { AbsenceRequestFormData, absenceRequestSchema } from "../_schemas/absence-request.schema";

export async function createAbsenceRequest(data: AbsenceRequestFormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const schema = absenceRequestSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }

        const payload = {
            absenceTypeId: data.absenceTypeId,
            year: data.referenceYear,
            startDate: format(data.startDate, 'yyyy-MM-dd'),
            endDate: format(data.endDate, 'yyyy-MM-dd'),
            totalDays: data.totalDays,
            comment: data.comment,
        };

        const response = await apiServer.post("/v1/absence-requests", payload);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || error.message };
    }
}
