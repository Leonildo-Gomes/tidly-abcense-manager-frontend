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
import { AbsenceType } from "./types";

interface AbsenceTypeTableProps {
  absenceTypes: AbsenceType[];
  onToggleStatus: (id: string) => void;
}

export default function AbsenceTypeTable({
  absenceTypes,
  onToggleStatus,
}: AbsenceTypeTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absenceTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No absence types found.
                </TableCell>
              </TableRow>
            ) : (
              absenceTypes.map((type) => (
                <TableRow key={type.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {type.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      {type.code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-normal capitalize bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {type.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize text-muted-foreground text-sm">
                    {type.unit}
                  </TableCell>
                  <TableCell>
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: type.color }}
                      title={type.color}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={type.status === "active"}
                        onCheckedChange={() => onToggleStatus(type.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          type.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {type.status === "active" ? "Active" : "Inactive"}
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
                            `/configuration/absence-type/${type.id}/edit`
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
