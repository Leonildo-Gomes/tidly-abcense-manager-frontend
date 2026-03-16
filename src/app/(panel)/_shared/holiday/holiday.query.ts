"use server";
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";
import { HolidayResponse } from "./holiday-response.schema";

async function getAllHolidays(): Promise<ApiResponse<HolidayResponse[]>> {
    try {
        const { data } = await apiServer.get<HolidayResponse[]>("/v1/holidays");
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch holidays",
            statusCode: error.response?.status || 500
        };
    }
}

async function getHolidayById(id: string): Promise<ApiResponse<HolidayResponse>> {
    try {
        const { data } = await apiServer.get<HolidayResponse>(`/v1/holidays/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch holiday with id ${id}`,
            statusCode: error.response?.status || 500
        };
    }
}

export { getAllHolidays, getHolidayById };
