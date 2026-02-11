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
import { Building2, MoreVertical, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Team } from "./types";

interface TeamGridProps {
  teams: Team[];
  onToggleStatus: (id: string) => void;
}

export default function TeamGrid({ teams, onToggleStatus }: TeamGridProps) {
  const router = useRouter();

  return (
    <div className="md:hidden grid gap-4">
      {teams.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border border-dashed">
          No teams found.
        </div>
      ) : (
        teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{team.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="font-mono text-[10px] px-1 py-0 h-4 bg-gray-50 text-gray-600 border-gray-200">
                        {team.code}
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
                      router.push(`/organization/team/${team.id}/edit`)
                    }
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onToggleStatus(team.id)}>
                    {team.status === "active" ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3 space-y-2 text-sm">
             
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  <span>{team.department}</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{team.members} members</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50/50 flex items-center justify-between border-t">
              <Badge
                variant={team.status === "active" ? "default" : "secondary"}
                className={cn(
                  "font-normal",
                  team.status === "active"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                )}
              >
                {team.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
