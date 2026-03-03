"use server";
import { apiServer } from "@/lib/axios-server";
import { DepartmentFormValues } from "../_schemas/department.schema";

export default async function createDepartmentAction(data: DepartmentFormValues) {
    const payload = {
        name: data.name,
        code: data.code,
        companyId: data.companyId,
        parentDepartmentId: data.parentId || null,
        status: data.status,
    };
    try {
        const response = await apiServer.post(`/v1/departments`, payload);
        return response.data;
    } catch (error: any) {
        console.error("Error creating department:", JSON.stringify(error.response?.data, null, 2));
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}

export async function updateDepartmentAction(id: string, data: DepartmentFormValues) {
    const payload = {
        name: data.name,
        code: data.code,
        companyId: data.companyId,
        parentDepartmentId: data.parentId || null,
        status: data.status,
    };
    try {
        const response = await apiServer.put(`/v1/departments/${id}`, payload);
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message };
    }
}
