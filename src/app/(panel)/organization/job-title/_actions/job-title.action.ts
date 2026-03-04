"use server";
import { apiServer } from "@/lib/axios-server";
import { JobTitleFormValues } from "../_schemas/job-title.schema";

export default async function createJobTitleAction(data: JobTitleFormValues) {
    const payload = {
        name: data.name,
        description: data.description,
        companyId: data.companyId,
        status: data.status,
    };
    try {
        const response = await apiServer.post(`/v1/job-titles`, payload);
        return response.data;
    } catch (error: any) {
        console.error("Error creating job title:", JSON.stringify(error.response?.data, null, 2));
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}

export async function updateJobTitleAction(id: string, data: JobTitleFormValues) {
    const payload = {
        name: data.name,
        description: data.description,
        companyId: data.companyId,
        status: data.status,
    };
    try {
        const response = await apiServer.put(`/v1/job-titles/${id}`, payload);
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}
