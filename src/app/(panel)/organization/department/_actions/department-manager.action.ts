"use server";
import { AssignManagerFormValues, DepartmentManagerHistoryResponse } from "@/app/(panel)/_shared/departments/department-manager.schema";
import { apiServer } from "@/lib/axios-server";

export async function assignDepartmentManagerAction(data: AssignManagerFormValues) {
    const payload = {
        managerId: data.managerId,
        startDate: data.startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
    };
    try {
        const response = await apiServer.post<DepartmentManagerHistoryResponse>(
            `/v1/departments/${data.departmentId}/manager`,
            payload
        );
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error assigning department manager:", JSON.stringify(error.response?.data, null, 2));
        return {
            success: false,
            error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message,
        };
    }
}

export async function getDepartmentManagerHistoryAction(departmentId: string) {
    try {
        const { data } = await apiServer.get<DepartmentManagerHistoryResponse[]>(
            `/v1/departments/${departmentId}/history`
        );
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch manager history",
            data: [] as DepartmentManagerHistoryResponse[],
        };
    }
}
