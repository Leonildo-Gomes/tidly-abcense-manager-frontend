export type Holiday = {
    id: string;
    name: string;
    date: Date;
    isRecurring: boolean;
    type: "public" | "company";
    status: "active" | "inactive";
};
