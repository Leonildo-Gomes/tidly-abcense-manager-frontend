"use server";
import { AssignJobTitleFormValues, EmployeeJobTitleHistoryResponse } from "@/app/(panel)/_shared/employee/employee-job-title.schema";
import { apiServer } from "@/lib/axios-server";

export async function assignEmployeeJobTitleAction(data: AssignJobTitleFormValues) {
    const payload = {
        jobTitleId: data.jobTitleId,
        startDate: data.startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
    };
    try {
        const response = await apiServer.post<EmployeeJobTitleHistoryResponse>(
            `/v1/employees/${data.employeeId}/job-titles`,
            payload
        );
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message,
        };
    }
}

export async function getEmployeeJobTitleHistoryAction(employeeId: string) {
    try {
        const { data } = await apiServer.get<EmployeeJobTitleHistoryResponse[]>(
            `/v1/employees/${employeeId}/job-titles/history`
        );
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch job title history",
            data: [] as EmployeeJobTitleHistoryResponse[],
        };
    }
}


