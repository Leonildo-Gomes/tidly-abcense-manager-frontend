"use client";

import { type EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ContextCardProps {
  employee?: EmployeeResponse | null;
}

export function ContextCard({ employee }: ContextCardProps) {
  return (
    <Card className="bg-linear-to-br from-primary/3 via-background to-background border-primary/10 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-8">
            <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-primary/10 shadow-md">
                        <AvatarImage src={employee?.name} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                            {employee?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background shadow-sm" />
                </div>
                <div>
                    <h3 className="font-bold text-xl tracking-tight text-foreground/90">
                        {employee?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                        {employee?.role?.replace("_", " ")}
                        {employee?.teamName && (
                            <>
                                <span>&bull;</span>
                                {employee.teamName}
                            </>
                        )}
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-muted/30 border border-primary/5 p-4 text-center group hover:bg-muted/50 transition-all duration-300">
                    <div className="text-3xl font-bold tracking-tighter text-primary group-hover:scale-110 transition-transform">12</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Vacation Balance</div>
                </div>
                <div className="rounded-md bg-muted/30 border border-primary/5 p-4 text-center group hover:bg-muted/50 transition-all duration-300">
                    <div className="text-3xl font-bold tracking-tighter text-orange-500 group-hover:scale-110 transition-transform">3</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Pending Requests</div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
