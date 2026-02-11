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
import { format } from "date-fns";
import { Pencil, Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import { Holiday } from "./types";

interface HolidayTableProps {
  holidays: Holiday[];
  onToggleStatus: (id: string) => void;
}

export default function HolidayTable({
  holidays,
  onToggleStatus,
}: HolidayTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Holiday Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidays.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No holidays found.
                </TableCell>
              </TableRow>
            ) : (
              holidays.map((holiday) => (
                <TableRow key={holiday.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {holiday.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-600">
                    {format(holiday.date, "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={holiday.type === "public" ? "secondary" : "outline"}
                      className={cn(
                        "font-normal capitalize",
                        holiday.type === "public" 
                            ? "bg-purple-50 text-purple-700 hover:bg-purple-50"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                      )}
                    >
                      {holiday.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {holiday.isRecurring && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-full w-fit">
                            <Repeat size={12} />
                            <span>Yearly</span>
                        </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={holiday.status === "active"}
                        onCheckedChange={() => onToggleStatus(holiday.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          holiday.status === "active"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {holiday.status === "active" ? "Active" : "Inactive"}
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
                            `/configuration/holiday/${holiday.id}/edit`
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
