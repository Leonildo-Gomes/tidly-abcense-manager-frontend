"use server";
import { apiServer } from "@/lib/axios-server";
import { DepartmentResponse } from "./department-response.schema";

export async function getAllDepartments() {
    try {
        const { data } = await apiServer.get<DepartmentResponse[]>(`/v1/departments`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch departments",
            statusCode: error.response?.status || 500
        };
    }
}

export async function getDepartmentById(id: string) {
    try {
        const { data } = await apiServer.get<DepartmentResponse>(`/v1/departments/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch department",
            statusCode: error.response?.status || 500
        };
    }
}