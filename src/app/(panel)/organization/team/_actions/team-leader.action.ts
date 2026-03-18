"use server";
import { AssignLeaderFormValues, TeamLeaderHistoryResponse } from "@/app/(panel)/_shared/team/team-leader.schema";
import { apiServer } from "@/lib/axios-server";

export async function assignTeamLeaderAction(data: AssignLeaderFormValues) {
    const payload = {
        leaderId: data.leaderId,
        startDate: data.startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
    };
    try {
        const response = await apiServer.post<TeamLeaderHistoryResponse>(
            `/v1/teams/${data.teamId}/leader`,
            payload
        );
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error assigning team leader:", JSON.stringify(error.response?.data, null, 2));
        return {
            success: false,
            error: error.response?.data?.message || JSON.stringify(error.response?.data) || error.message,
        };
    }
}

export async function getTeamLeaderHistoryAction(teamId: string) {
    try {
        const { data } = await apiServer.get<TeamLeaderHistoryResponse[]>(
            `/v1/teams/${teamId}/history`
        );
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error.response?.data?.message || error.message || "Failed to fetch leader history",
            data: [] as TeamLeaderHistoryResponse[],
        };
    }
}
