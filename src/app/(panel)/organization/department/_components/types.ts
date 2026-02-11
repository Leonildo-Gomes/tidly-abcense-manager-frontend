export type Department = {
    id: string;
    name: string;
    code: string;
    companyId: string;
    parentId?: string;
    status: "active" | "inactive";
    employees: number;
};
