"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DepartmentManagerHistoryResponse } from "@/app/(panel)/_shared/departments/department-manager.schema";
import { format, parseISO } from "date-fns";

interface DepartmentManagerHistoryProps {
    history: DepartmentManagerHistoryResponse[];
}

function formatDateSafe(dateStr: string | null | undefined): string {
    if (!dateStr) return "—";
    try {
        return format(parseISO(dateStr), "dd MMM yyyy");
    } catch {
        return dateStr;
    }
}

export function DepartmentManagerHistory({ history }: DepartmentManagerHistoryProps) {
    if (history.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-4 text-center">
                No manager history found for this department.
            </p>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Manager</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((record) => (
                    <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.managerName}</TableCell>
                        <TableCell>{formatDateSafe(record.startDate)}</TableCell>
                        <TableCell>{formatDateSafe(record.endDate)}</TableCell>
                        <TableCell>
                            {!record.endDate ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Current
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                    Past
                                </Badge>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
