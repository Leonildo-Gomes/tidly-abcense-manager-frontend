"use server"
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";
import { TeamResponse } from "./team-response.schema";

export async function getAllTeamsByCompanyId(): Promise<ApiResponse<TeamResponse[]>> {
    try {
        const { data } = await apiServer.get<TeamResponse[]>(`/v1/teams`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error(`[getAllTeamsByCompanyId] Error fetching teams for company`, error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch teams for company`,
            statusCode: error.response?.status || 500
        };
    }
}

export async function getTeamById(id: string): Promise<ApiResponse<TeamResponse>> {
    try {
        const { data } = await apiServer.get<TeamResponse>(`/v1/teams/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error(`[getTeamById] Error fetching team for company`, error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch team for company`,
            statusCode: error.response?.status || 500
        };
    }
}
