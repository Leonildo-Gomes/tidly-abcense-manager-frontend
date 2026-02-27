"use server";
import { apiServer } from "@/lib/axios-server";
import { CompanyFormValues } from "../_schemas/company.schema";

import { auth } from "@clerk/nextjs/server";

export default async function createCompanyAction(data: CompanyFormValues) {
    const { orgId } = await auth();

    if (!orgId) {
        return { error: "Organization ID is missing. User must be in an organization." };
    }

    const payload = {
        name: data.name,
        organizationNumber: data.code,
        clerkOrgId: orgId,
    };
    try {
        const response = await apiServer.post("/v1/companies", payload);
        return response.data;
    } catch (error: any) {
        console.error("Error creating company:", JSON.stringify(error.response?.data, null, 2));
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}

export async function updateCompanyAction(id: string, data: CompanyFormValues) {
    console.log("Updating company:", data);
    const payload = {
        name: data.name,
        organizationNumber: data.code,
        isActive: data.status,
    };
    try {
        const response = await apiServer.put(`/v1/companies/${id}`, payload);
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}
