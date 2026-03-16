"use server";
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";

export interface CreateAbsencePolicyRequest {
    companyId: string;
    absenceTypeId: string;
    departmentId?: string | null;
    maxDaysPerYear: number;
    minNoticeDays: number;
}

export type UpdateAbsencePolicyRequest = Partial<CreateAbsencePolicyRequest>;

export async function createAbsencePolicy(payload: CreateAbsencePolicyRequest): Promise<ApiResponse<any>> {
    try {
        const { data } = await apiServer.post("/v1/company-absence-settings", payload);
        return {
            success: true,
            data,
            statusCode: 201
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || "Failed to create policy",
            statusCode: error.response?.status || 500
        };
    }
}

export async function updateAbsencePolicy(id: string, payload: UpdateAbsencePolicyRequest): Promise<ApiResponse<any>> {
    try {
        const { data } = await apiServer.put(`/v1/absence-policies/${id}`, payload);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || "Failed to update policy",
            statusCode: error.response?.status || 500
        };
    }
}
