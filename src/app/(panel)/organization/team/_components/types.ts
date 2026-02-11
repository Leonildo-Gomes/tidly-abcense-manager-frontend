export type Team = {
    id: string;
    name: string;
    code: string;
    department: string;
    status: "active" | "inactive";
    members: number;
};
