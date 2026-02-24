"use server";
import { Employee } from "../_components/types";
export async function getEmployeeById(id: string) {
    const employee: Employee = {
        id: "1",
        name: "John Doe",
        email: "john.doe@acme.com",
        phone: "+1 555-0101",
        gender: "male",
        companyId: "1",
        teamId: "1",
        role: "Senior Developer",
        startDate: new Date("2023-01-15"),
        status: "active",
        avatar: "/avatars/john.jpg",
    };
    return employee;
}
export async function getAllEmployees() {
    const initialEmployees: Employee[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@acme.com",
            phone: "+1 555-0101",
            gender: "male",
            companyId: "1",
            teamId: "1",
            role: "Senior Developer",
            startDate: new Date("2023-01-15"),
            status: "active",
            avatar: "/avatars/john.jpg",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@globex.com",
            phone: "+1 555-0102",
            gender: "female",
            companyId: "2",
            teamId: "2",
            role: "Sales Manager",
            startDate: new Date("2023-03-20"),
            status: "active",
        },
        {
            id: "3",
            name: "Bob Johnson",
            email: "bob.j@acme.com",
            phone: "+1 555-0103",
            gender: "male",
            companyId: "1",
            teamId: "1",
            role: "Junior Developer",
            startDate: new Date("2024-01-10"),
            status: "inactive",
        },
    ];
    return initialEmployees;
}