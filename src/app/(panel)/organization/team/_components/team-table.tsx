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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Team } from "./types";

interface TeamTableProps {
  teams: Team[];
  onToggleStatus: (id: string) => void;
}

export default function TeamTable({ teams, onToggleStatus }: TeamTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Team Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No teams found.
                </TableCell>
              </TableRow>
            ) : (
              teams.map((team) => (
                <TableRow key={team.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {team.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      {team.code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-normal bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {team.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {team.members}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={team.status === "active"}
                        onCheckedChange={() => onToggleStatus(team.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          team.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {team.status === "active" ? "Active" : "Inactive"}
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
                          router.push(`/organization/team/${team.id}/edit`)
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
