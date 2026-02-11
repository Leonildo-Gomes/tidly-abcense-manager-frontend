export type Employee = {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female" | "other";
    companyId: string;
    teamId: string;
    role: string;
    startDate: Date;
    status: "active" | "inactive";
    avatar?: string;
};
