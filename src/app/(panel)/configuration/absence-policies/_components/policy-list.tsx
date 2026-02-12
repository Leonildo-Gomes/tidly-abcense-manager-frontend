"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock data
const policies = [
  {
    id: "p1",
    company_name: "Acme Corp",
    absence_type: "Vacation",
    department: null, // General Rule
    max_days: 22.5,
    min_notice: 14,
  },
  {
    id: "p2",
    company_name: "Acme Corp",
    absence_type: "Sick Leave",
    department: null,
    max_days: 10,
    min_notice: 0,
  },
  {
    id: "p3",
    company_name: "Acme Corp",
    absence_type: "Vacation",
    department: "Engineering", // Specific Rule override
    max_days: 25,
    min_notice: 30,
  },
];

export function PolicyList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Absence Type</TableHead>
            <TableHead>Scope (Department)</TableHead>
            <TableHead className="text-right">Max Days/Year</TableHead>
            <TableHead className="text-right">Min Notice (Days)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="font-medium">{policy.company_name}</TableCell>
              <TableCell>{policy.absence_type}</TableCell>
              <TableCell>
                {policy.department ? (
                  <Badge variant="outline">{policy.department}</Badge>
                ) : (
                  <Badge variant="secondary">General Rule</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">{policy.max_days}</TableCell>
              <TableCell className="text-right">{policy.min_notice}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/configuration/absence-policies/${policy.id}/edit`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
