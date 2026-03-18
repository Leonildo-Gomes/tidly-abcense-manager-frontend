"use client";

import { TeamLeaderHistoryResponse } from "@/app/(panel)/_shared/team/team-leader.schema";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";

interface TeamLeaderHistoryProps {
    history: TeamLeaderHistoryResponse[];
}

function formatDateSafe(dateStr: string | null | undefined): string {
    if (!dateStr) return "—";
    try {
        return format(parseISO(dateStr), "dd MMM yyyy");
    } catch {
        return dateStr;
    }
}

export function TeamLeaderHistory({ history }: TeamLeaderHistoryProps) {
    if (history.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-4 text-center">
                No leader history found for this team.
            </p>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Leader</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((record) => (
                    <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.leaderName}</TableCell>
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
