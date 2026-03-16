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

export interface MappedPolicy {
  id: string;
  companyName: string;
  absenceTypeName: string;
  departmentName: string | null;
  maxDaysPerYear: number;
  minNoticeDays: number;
}

interface PolicyListProps {
    initialPolicies: MappedPolicy[];
}

export function PolicyList({ initialPolicies }: PolicyListProps) {

  console.log("initialPolicies", initialPolicies);
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
          {initialPolicies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="font-medium">{policy.companyName}</TableCell>
              <TableCell>{policy.absenceTypeName}</TableCell>
              <TableCell>
                {policy.departmentName ? (
                  <Badge variant="outline">{policy.departmentName}</Badge>
                ) : (
                  <Badge variant="secondary">General Rule</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">{policy.maxDaysPerYear}</TableCell>
              <TableCell className="text-right">{policy.minNoticeDays}</TableCell>
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
