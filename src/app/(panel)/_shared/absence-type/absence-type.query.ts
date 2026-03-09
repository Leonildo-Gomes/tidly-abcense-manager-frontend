"use server";
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";
import { AbsenceTypeResponse } from "./absence-type-response.schema";

async function getAllAbsenceTypes(): Promise<ApiResponse<AbsenceTypeResponse[]>> {
    try {
        const { data } = await apiServer.get<AbsenceTypeResponse[]>("/v1/absence-types");
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch absence types",
            statusCode: error.response?.status || 500
        };
    }
}

async function getAbsenceTypeById(id: string): Promise<ApiResponse<AbsenceTypeResponse>> {
    try {
        const { data } = await apiServer.get<AbsenceTypeResponse>(`/v1/absence-types/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch absence type with id ${id}`,
            statusCode: error.response?.status || 500
        };
    }
}

export { getAbsenceTypeById, getAllAbsenceTypes };
