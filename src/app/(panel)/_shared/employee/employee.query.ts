"use server";
import { apiServer } from "@/lib/axios-server";
import { EmployeeResponse } from "./employee-response.schema";


export async function getAllEmployees() {
    try {
        const { data } = await apiServer.get<EmployeeResponse[]>(`/v1/employees`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch employees",
            statusCode: error.response?.status || 500
        };
    }
}

export async function getEmployeeById(id: string) {
    try {
        const { data } = await apiServer.get<EmployeeResponse>(`/v1/employees/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch employee",
            statusCode: error.response?.status || 500
        };
    }
}