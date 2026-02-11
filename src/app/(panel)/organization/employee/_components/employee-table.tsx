"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Mail, Pencil, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Employee } from "./types";

interface EmployeeTableProps {
  employees: Employee[];
  getCompanyName: (id: string) => string;
  getTeamName: (id: string) => string;
  onToggleStatus: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  getCompanyName,
  getTeamName,
  onToggleStatus,
}: EmployeeTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Employee</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role & Team</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-gray-100 border border-gray-200">
                        <AvatarImage src={emp.avatar} alt={emp.name} />
                        <AvatarFallback className="text-gray-500 bg-gray-50">
                          {emp.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {emp.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getCompanyName(emp.companyId)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail size={12} />
                        {emp.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone size={12} />
                        {emp.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{emp.role}</span>
                      <span className="text-xs text-muted-foreground">
                        {getTeamName(emp.teamId)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(emp.startDate, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={emp.status === "active"}
                        onCheckedChange={() => onToggleStatus(emp.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          emp.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {emp.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/5"
                        onClick={() =>
                          router.push(`/organization/employee/${emp.id}/edit`)
                        }
                      >
                        <Pencil size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
