import { auth, clerkClient } from "@clerk/nextjs/server";
import { EmployeeFormValues, employeeSchema } from "../_schemas/employee.schema";

export async function inviteEmployee(data: EmployeeFormValues) {
    const { userId, orgId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const schema = employeeSchema.safeParse(data);
        if (!schema.success) {
            return {
                success: false,
                error: schema.error.issues[0].message
            }
        }
        const client = await clerkClient();
        const invitation = await client.organizations.createOrganizationInvitation({
            emailAddress: schema.data.email,
            role: schema.data.role as any,
            organizationId: orgId!,
        });


        return {
            success: true,
            data: invitation
        };
    } catch (error: any) {
        const errorMessage = error?.errors?.[0]?.message || "Ocorreu um erro ao enviar o convite.";
        return {
            success: false,
            error: errorMessage
        };
    }
}