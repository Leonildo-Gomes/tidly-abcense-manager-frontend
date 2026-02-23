
export interface EmployeeFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
        phone: string;
        gender: "male" | "female" | "other";
        companyId: string;
        teamId: string;
        role?: "org:admin" | "org:member";
        startDate: Date;
        endDate?: Date;
        status: "active" | "inactive";
    } | null;
}