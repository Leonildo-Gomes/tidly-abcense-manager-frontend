"use server";
import { api } from "@/lib/axios";
import { CompanyFormValues } from "../_schemas/company.schema";

export default async function createCompanyAction(data: CompanyFormValues) {
    const response = await api.post("/v1/companies", data);
    return response.data;
}