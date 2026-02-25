
"use server";
import { ApiResponse } from "@/lib/api-types";
import { api } from "@/lib/axios";
import { CompanyResponse } from "../_schemas/company-response.schema";

async function getAllCompanies(): Promise<ApiResponse<CompanyResponse[]>> {
    try {
        const { data } = await api.get<CompanyResponse[]>("/v1/companies");
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error("[getAllCompanies] Error fetching companies:", error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch companies",
            statusCode: error.response?.status || 500
        };
    }
}

async function getCompanyById(id: string): Promise<ApiResponse<CompanyResponse>> {
    try {
        const { data } = await api.get<CompanyResponse>(`/v1/companies/${id}`);
        return {
            success: true,
            data,
            statusCode: 200
        };
    } catch (error: any) {
        console.error(`[getCompanyById] Error fetching company ${id}:`, error);
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || `Failed to fetch company with id ${id}`,
            statusCode: error.response?.status || 500
        };
    }
}

export { getAllCompanies, getCompanyById };
