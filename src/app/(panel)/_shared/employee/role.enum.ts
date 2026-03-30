export enum Role {
    ADMIN = "org:admin",
    MEMBER = "org:member",
    EMPLOYEE = "org:employee",
    LEADER = "org:leader",
    MANAGER = "org:manager",
}

export const ROLE_OPTIONS = [
    { value: Role.ADMIN, label: "Administrator" },
    { value: Role.MEMBER, label: "Member" },
    { value: Role.EMPLOYEE, label: "Employee" },
    { value: Role.LEADER, label: "Leader" },
    { value: Role.MANAGER, label: "Manager" },
];
