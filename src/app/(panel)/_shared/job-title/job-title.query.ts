"use server"
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";
import { JobTitleResponse } from "./job-title-response.schema";

export async function getAllJobTitles(): Promise<ApiResponse<JobTitleResponse[]>> {
    try {
        const { data } = await apiServer.get<JobTitleResponse[]>(`/v1/job-titles`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error(`[getAllJobTitles] Error fetching job titles`, error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch job titles`,
            statusCode: error.response?.status || 500
        };
    }
}

export async function getJobTitleById(id: string): Promise<ApiResponse<JobTitleResponse>> {
    try {
        const { data } = await apiServer.get<JobTitleResponse>(`/v1/job-titles/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error(`[getJobTitleById] Error fetching job title`, error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch job title`,
            statusCode: error.response?.status || 500
        };
    }
}
