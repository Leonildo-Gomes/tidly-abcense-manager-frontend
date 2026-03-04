"use client";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
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
import { Briefcase, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobTitleTableProps {
  jobTitles: JobTitleResponse[];
  onToggleStatus: (id: string) => void;
}

export default function JobTitleTable({
  jobTitles,
  onToggleStatus,
}: JobTitleTableProps) {
  const router = useRouter();

  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobTitles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No job titles found.
                </TableCell>
              </TableRow>
            ) : (
              jobTitles.map((job) => (
                <TableRow key={job.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase size={16} />
                      </div>
                      <span className="font-medium text-foreground">
                        {job.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Badge
                      variant="secondary"
                      className="font-normal bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {job.companyName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {job.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Switch
                        checked={job.status}
                        onCheckedChange={() => onToggleStatus(job.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          job.status 
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {job.status ? "Active" : "Inactive"}
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
                          router.push(`/organization/job-title/${job.id}/edit`)
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
