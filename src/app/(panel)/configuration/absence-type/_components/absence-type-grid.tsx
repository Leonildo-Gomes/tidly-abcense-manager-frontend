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
import { Calendar, MoreVertical, Paperclip, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { AbsenceTypeResponse } from "@/app/(panel)/_shared/absence-type/absence-type-response.schema";

interface AbsenceTypeGridProps {
  absenceTypes: AbsenceTypeResponse[];
  onToggleStatus: (id: string) => void;
}

export default function AbsenceTypeGrid({
  absenceTypes,
  onToggleStatus,
}: AbsenceTypeGridProps) {
  const router = useRouter();

  return (
    <div className="md:hidden grid gap-4">
      {absenceTypes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border border-dashed">
          No absence types found.
        </div>
      ) : (
        absenceTypes.map((type) => (
          <Card key={type.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center border border-gray-100 shadow-sm"
                style={{ backgroundColor: type.color }}
              >
                  <Calendar className="text-white mix-blend-luminosity" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{type.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] px-1 py-0 h-4 bg-gray-50 text-gray-600 border-gray-200"
                  >
                    {type.code}
                  </Badge>
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
                        `/configuration/absence-type/${type.id}/edit`
                      )
                    }
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onToggleStatus(type.id)}>
                    {type.isActive ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3 space-y-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-start gap-2">
                    <Text size={14} className="mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{type.description || "No description"}</span>
                  </div>
                  {type.requiredAttachment && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal">
                        <Paperclip size={12} className="mr-1" />
                        Required Attachment
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50/50 flex items-center justify-between border-t">
              <Badge
                variant={type.isActive ? "default" : "secondary"}
                className={cn(
                  "font-normal",
                  type.isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                )}
              >
                {type.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
