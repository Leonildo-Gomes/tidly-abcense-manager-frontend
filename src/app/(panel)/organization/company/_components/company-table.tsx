"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Company } from "./types";

interface CompanyTableProps {
  companies: Company[];
  onToggleStatus: (id: string) => void;
}

export default function CompanyTable({
  companies,
  onToggleStatus,
}: CompanyTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Company</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No companies found.
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-gray-100 border border-gray-200">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback className="text-gray-500 bg-gray-50">
                          {company.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {company.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      {company.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {company.employees.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={company.status === "active"}
                        onCheckedChange={() => onToggleStatus(company.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          company.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {company.status === "active" ? "Active" : "Inactive"}
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
                          router.push(
                            `/organization/company/${company.id}/edit`
                          )
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
