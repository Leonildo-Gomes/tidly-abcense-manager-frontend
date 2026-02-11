"use client";

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
import { CalendarIcon, MoreVertical, Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import { Holiday } from "./types";

interface HolidayGridProps {
  holidays: Holiday[];
  onToggleStatus: (id: string) => void;
}

export default function HolidayGrid({
  holidays,
  onToggleStatus,
}: HolidayGridProps) {
  const router = useRouter();

  return (
    <div className="md:hidden grid gap-4">
      {holidays.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border border-dashed">
          No holidays found.
        </div>
      ) : (
        holidays.map((holiday) => (
          <Card key={holiday.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center bg-purple-50 text-purple-600"
              >
                  <CalendarIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{holiday.name}</h3>
                <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                    <span>{format(holiday.date, "MMMM d, yyyy")}</span>
                </div>
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
                      router.push(
                        `/configuration/holiday/${holiday.id}/edit`
                      )
                    }
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onToggleStatus(holiday.id)}>
                    {holiday.status === "active" ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3 space-y-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Badge
                      variant={holiday.type === "public" ? "secondary" : "outline"}
                      className={cn(
                        "font-normal capitalize text-[10px] h-5",
                        holiday.type === "public" 
                            ? "bg-purple-50 text-purple-700 hover:bg-purple-50"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                      )}
                    >
                      {holiday.type}
                    </Badge>
                </div>
                {holiday.isRecurring && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Repeat size={12} />
                    <span>Yearly</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50/50 flex items-center justify-between border-t">
              <Badge
                variant={holiday.status === "active" ? "default" : "secondary"}
                className={cn(
                  "font-normal",
                  holiday.status === "active"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                )}
              >
                {holiday.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
