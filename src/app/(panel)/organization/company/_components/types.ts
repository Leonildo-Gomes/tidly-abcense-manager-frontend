export type Company = {
    id: string;
    name: string;
    code: string;
    status: "active" | "inactive";
    logo?: string;
    employees: number;
};
