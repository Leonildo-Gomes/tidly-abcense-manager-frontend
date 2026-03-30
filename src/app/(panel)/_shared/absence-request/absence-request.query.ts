"use server";
import { apiServer } from "@/lib/axios-server";
import { AbsenceRequestResponse } from "./absence-request-response.schema";
import { ApiResponse } from "@/lib/api-types";

export async function getMyAbsences(): Promise<ApiResponse<AbsenceRequestResponse[]>> {
    try {
        const { data } = await apiServer.get<AbsenceRequestResponse[]>(`/v1/absence-requests/me`);
        return { success: true, data, statusCode: 200 };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch absences",
            statusCode: error.response?.status || 500,
        };
    }
}

export async function getAbsencesByTeamId(teamId: string): Promise<ApiResponse<AbsenceRequestResponse[]>> {
    try {
        const { data } = await apiServer.get<AbsenceRequestResponse[]>(`/v1/absence-requests/team/${teamId}`);
        return { success: true, data, statusCode: 200 };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch team absences",
            statusCode: error.response?.status || 500,
        };
    }
}

export async function getAbsencesByDepartment(): Promise<ApiResponse<AbsenceRequestResponse[]>> {
    try {
        const { data } = await apiServer.get<AbsenceRequestResponse[]>(`/v1/absence-requests/my-department`);
        return { success: true, data, statusCode: 200 };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch department absences",
            statusCode: error.response?.status || 500,
        };
    }
}
