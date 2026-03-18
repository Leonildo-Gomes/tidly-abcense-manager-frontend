"use client";

import { AssignJobTitleFormValues, assignJobTitleSchema } from "@/app/(panel)/_shared/employee/employee-job-title.schema";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, UserCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { assignEmployeeJobTitleAction } from "../_actions/employee-job-title.action";

interface AssignJobTitleDialogProps {
    employeeId: string;
    jobTitles: JobTitleResponse[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function AssignJobTitleDialog({ employeeId, jobTitles, open, onOpenChange, onSuccess }: AssignJobTitleDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AssignJobTitleFormValues>({
        resolver: zodResolver(assignJobTitleSchema),
        defaultValues: {
            jobTitleId: "",
            employeeId: employeeId,
            startDate: new Date(),
        },
    });

    const onSubmit = async (data: AssignJobTitleFormValues) => {
        setIsLoading(true);
        try {
            const result = await assignEmployeeJobTitleAction({
                employeeId,
                jobTitleId: data.jobTitleId,
                startDate: data.startDate,
            });

            if (!result.success) {
                toast.error(result.error || "Failed to assign job title.");
                return;
            }

            toast.success("Job title assigned successfully!");
            form.reset();
            onOpenChange(false);
            onSuccess();
        } catch (err: any) {
            toast.error(err?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Job Title</DialogTitle>
                    <DialogDescription>
                        Select a job title for this employee. The previous
                        job title's term will be automatically closed.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="jobTitleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a job title" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {jobTitles.map((jt) => (
                                                <SelectItem key={jt.id} value={jt.id}>
                                                    {jt.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value
                                                        ? format(field.value, "PPP")
                                                        : "Pick a date"}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        Assign Job Title
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
