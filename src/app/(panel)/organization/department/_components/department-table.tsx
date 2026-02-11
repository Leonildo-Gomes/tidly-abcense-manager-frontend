"use client";

import { Badge } from "@/components/ui/badge";
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
import { Building2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Department } from "./types";

interface DepartmentTableProps {
  departments: Department[];
  getCompanyName: (id: string) => string;
  getParentName: (id?: string) => string;
  onToggleStatus: (id: string) => void;
}

export default function DepartmentTable({
  departments,
  getCompanyName,
  getParentName,
  onToggleStatus,
}: DepartmentTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[250px]">Department</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Parent Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((dept) => (
                <TableRow key={dept.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Building2 size={16} />
                      </div>
                      <span className="font-medium text-foreground">
                        {dept.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      {dept.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {getCompanyName(dept.companyId)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {getParentName(dept.parentId)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={dept.status === "active"}
                        onCheckedChange={() => onToggleStatus(dept.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          dept.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {dept.status === "active" ? "Active" : "Inactive"}
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
                          router.push(`/organization/department/${dept.id}/edit`)
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
