"use server";
import { apiServer } from "@/lib/axios-server";
import { TeamFormValues } from "../_schemas/team.schema";

export default async function createTeamAction(data: TeamFormValues) {
    const payload = {
        name: data.name,
        code: data.code,
        departmentId: data.departmentId,
        status: data.status,
    };
    try {
        const response = await apiServer.post(`/v1/teams`, payload);
        return response.data;
    } catch (error: any) {
        console.error("Error creating team:", JSON.stringify(error.response?.data, null, 2));
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}

export async function updateTeamAction(id: string, data: TeamFormValues) {
    const payload = {
        name: data.name,
        code: data.code,
        departmentId: data.departmentId,
        status: data.status,
    };
    try {
        const response = await apiServer.put(`/v1/teams/${id}`, payload);
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}
