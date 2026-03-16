"use server";
import { ApiResponse } from "@/lib/api-types";
import { apiServer } from "@/lib/axios-server";
import { AbsencePolicyResponse } from "./absence-policy-response.schema";

export async function getAllAbsencePolicies(): Promise<ApiResponse<AbsencePolicyResponse[]>> {
  try {
    const { data } = await apiServer.get<AbsencePolicyResponse[]>("/v1/company-absence-settings");
    return {
      success: true,
      data,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      errorMessage: error.response?.data?.message || error.message || "Failed to fetch absence policies",
      statusCode: error.response?.status || 500,
    };
  }
}

export async function getAbsencePolicyById(id: string): Promise<ApiResponse<AbsencePolicyResponse>> {
  try {
    const { data } = await apiServer.get<AbsencePolicyResponse>(`/v1/company-absence-settings/${id}`);
    return {
      success: true,
      data,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      errorMessage: error.response?.data?.message || error.message || `Failed to fetch policy ${id}`,
      statusCode: error.response?.status || 500,
    };
  }
}
