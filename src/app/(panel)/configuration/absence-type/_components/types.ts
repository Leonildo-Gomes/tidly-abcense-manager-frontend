export type AbsenceType = {
    id: string;
    name: string;
    code: string;
    category: "vacation" | "sick" | "other";
    unit: "days" | "hours";
    status: "active" | "inactive";
    color: string; // For calendar visualization
};
