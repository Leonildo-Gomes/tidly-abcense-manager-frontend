"use server";
import { apiServer } from '@/lib/axios-server';
import { auth } from '@clerk/nextjs/server';
import { format } from "date-fns";
import { HolidayFormValues, holidaySchema } from "../_schemas/holiday.schema";

export async function createHoliday(data: HolidayFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    
    try {
        const schema = holidaySchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }
        
        // Formata para LocalDate YYYY-MM-DD
        const formattedDate = format(data.date, 'yyyy-MM-dd');
        
        const payload = {
            name: data.name,
            date: formattedDate,
            type: data.type.toUpperCase(), // backend enum usually uppercase
            isRecurring: data.isRecurring,
            isActive: data.status,
            // companyId is inferred by backend from the user's token
        };

        const response = await apiServer.post("/v1/holidays", payload);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error creating holiday:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}

export async function updateHoliday(id: string, data: HolidayFormValues) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    
    try {
        const schema = holidaySchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }
        
        const formattedDate = format(data.date, 'yyyy-MM-dd');
        
        const payload = {
            name: data.name,
            date: formattedDate,
            type: data.type.toUpperCase(),
            isRecurring: data.isRecurring,
            isActive: data.status,
        };

        const response = await apiServer.put(`/v1/holidays/${id}`, payload);
        return { success: true, data: response.data };
    } catch (error: any) {
         console.error("Error updating holiday:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}
