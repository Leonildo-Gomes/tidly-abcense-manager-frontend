"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Mail, MoreVertical, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Employee } from "./types";

interface EmployeeGridProps {
  employees: Employee[];
  getCompanyName: (id: string) => string;
  getTeamName: (id: string) => string;
  onToggleStatus: (id: string) => void;
}

export default function EmployeeGrid({
  employees,
  getCompanyName,
  getTeamName,
  onToggleStatus,
}: EmployeeGridProps) {
  const router = useRouter();

  return (
    <div className="md:hidden grid gap-4">
      {employees.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border border-dashed">
          No employees found.
        </div>
      ) : (
        employees.map((emp) => (
          <Card key={emp.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
              <Avatar className="h-10 w-10 bg-gray-100 border border-gray-200">
                <AvatarImage src={emp.avatar} alt={emp.name} />
                <AvatarFallback className="text-gray-500 bg-gray-50">
                  {emp.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{emp.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{emp.role}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/organization/employee/${emp.id}/edit`)
                    }
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onToggleStatus(emp.id)}>
                    {emp.status === "active" ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={14} />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{getTeamName(emp.teamId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  <span>{format(emp.startDate, "MMM yyyy")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50/50 flex items-center justify-between border-t">
              <Badge
                variant={emp.status === "active" ? "default" : "secondary"}
                className={cn(
                  "font-normal",
                  emp.status === "active"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                )}
              >
                {emp.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">
                {getCompanyName(emp.companyId)}
              </span>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
