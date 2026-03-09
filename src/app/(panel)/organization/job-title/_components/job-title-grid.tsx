"use client";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
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
import { Briefcase, Building2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobTitleGridProps {
  jobTitles: JobTitleResponse[];
  onToggleStatus: (id: string) => void;
}

export default function JobTitleGrid({
  jobTitles,
  onToggleStatus,
}: JobTitleGridProps) {
  const router = useRouter();

  return (
    <div className="md:hidden grid gap-4">
      {jobTitles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-white rounded-lg border border-dashed">
          No job titles found.
        </div>
      ) : (
        jobTitles.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{job.name}</h3>
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
                      router.push(`/organization/job-title/${job.id}/edit`)
                    }
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onToggleStatus(job.id)}>
                    {job.isActive ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3 space-y-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  <span>{job.companyName}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50/50 flex items-center justify-between border-t">
              <Badge
                variant={job.isActive ? "default" : "secondary"}
                className={cn(
                  "font-normal",
                  job.isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                )}
              >
                {job.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
