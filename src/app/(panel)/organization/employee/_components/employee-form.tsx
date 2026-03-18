"use client";
import { EmployeeJobTitleHistoryResponse } from "@/app/(panel)/_shared/employee/employee-job-title.schema";
import { Gender, GENDER_OPTIONS } from "@/app/(panel)/_shared/employee/gender.enum";
import { Role, ROLE_OPTIONS } from "@/app/(panel)/_shared/employee/role.enum";
import { JobTitleResponse } from "@/app/(panel)/_shared/job-title/job-title-response.schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Briefcase, CalendarIcon, Loader2, Save, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createEmployee, updateEmployee } from "../_actions/create-employee.action";
import { EmployeeFormValues, employeeSchema } from "../_schemas/employee.schema";
import { EmployeeFormProps } from "../_types/employee.types";
import { AssignJobTitleDialog } from "./assign-job-title-dialog";
import { EmployeeJobTitleHistory } from "./employee-job-title-history";

export default function EmployeeForm({
    initialData,
    companies,
    departments,
    teams,
    jobTitles = [],
    jobTitleHistory = [],
}: EmployeeFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isJobTitleDialogOpen, setIsJobTitleDialogOpen] = useState(false);
    const { organization, isLoaded } = useOrganization();

    const isEditing = !!initialData?.id;
    const currentJobTitle = jobTitleHistory.find((h) => !h.endDate) ?? null;

    const title = isEditing ? "Edit Employee" : "Create Employee";
    const description = isEditing
        ? "Edit employee details."
        : "Add a new employee to your organization.";
    const action = isEditing ? "Save Changes" : "Create Employee";

    const defaultValues: EmployeeFormValues = {
        name: initialData?.name || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        gender: initialData?.gender || Gender.MALE,
        companyId: initialData?.companyId || "",
        teamId: initialData?.teamId || "",
        role: initialData?.role || Role.MEMBER,
        startDate: initialData?.startDate || new Date(),
        endDate: initialData?.endDate,
        status: initialData?.isActive ?? true,
    };

    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues,
    });

    const selectedCompanyId = form.watch("companyId");

    const filteredTeams = useMemo(() => {
        if (!selectedCompanyId) return [];
        const companyDeptIds = departments
            .filter((d) => d.companyId === selectedCompanyId)
            .map((d) => d.id);
        return teams.filter((t) => companyDeptIds.includes(t.departmentId));
    }, [selectedCompanyId, departments, teams]);

    const onSubmit = async (data: EmployeeFormValues) => {
        setIsLoading(true);
        try {
            let response;
            if (initialData?.id) {
                response = await updateEmployee(initialData.id, data);
                if (response?.error) {
                    toast.error(response.error);
                    return;
                }
                toast.success("Employee updated successfully.");
            } else {
                if (!isLoaded || !organization) {
                    throw new Error("Organization context not loaded.");
                }
                response = await createEmployee(data);
                if (response?.error) {
                    toast.error(response.error);
                    return;
                }
                await organization.inviteMember({
                    emailAddress: data.email,
                    role: data.role as any,
                });
                toast.success(`Invitation sent to ${data.email}!`);
            }
            router.push("/organization/employee");
            router.refresh();
        } catch (err: any) {
            console.error("Submit Error:", err);
            toast.error(err.errors?.[0]?.message || err.message || "Failed to save employee.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleJobTitleAssigned = () => {
        router.refresh();
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2"
            >
                <ArrowLeft size={16} />
                Back to Employees
            </Button>

            <div className="grid gap-6">
                {/* --- Employee Info Card --- */}
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Personal Info */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@example.com" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 555-0000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {GENDER_OPTIONS.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Organization Info */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="companyId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a company" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {companies.map((company) => (
                                                            <SelectItem key={company.id} value={company.id}>
                                                                {company.name}
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
                                        name="teamId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Team</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={!selectedCompanyId || filteredTeams.length === 0}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={
                                                                !selectedCompanyId ? "Select a company first" :
                                                                filteredTeams.length === 0 ? "No teams available" :
                                                                "Select a team"
                                                            } />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {filteredTeams.map((team) => (
                                                            <SelectItem key={team.id} value={team.id}>
                                                                {team.name}
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
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>System Role</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {ROLE_OPTIONS.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Dates */}
                                <div className="grid gap-4 md:grid-cols-2">
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
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>End Date (Optional)</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date < new Date("1900-01-01")}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Active Status</FormLabel>
                                                <FormDescription>
                                                    {field.value
                                                        ? "Employee is active in the system."
                                                        : "Employee is inactive."}
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value === true}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                    className="data-[state=checked]:bg-green-500"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                {action}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* --- Job Title Section (Edit only) --- */}
                {isEditing && (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Job Title</CardTitle>
                                    <CardDescription>
                                        The current position held by this employee.
                                    </CardDescription>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsJobTitleDialogOpen(true)}
                                    disabled={jobTitles.length === 0}
                                >
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    {currentJobTitle ? "Change Job Title" : "Assign Job Title"}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {currentJobTitle ? (
                                    <div className="flex items-center gap-3 rounded-lg border p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                            <Briefcase className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{currentJobTitle.jobTitleName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Since {currentJobTitle.startDate}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 rounded-lg border border-dashed p-4 text-muted-foreground">
                                        <UserX className="h-5 w-5" />
                                        <p className="text-sm">No job title assigned to this employee.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Job Title History</CardTitle>
                                <CardDescription>
                                    Historical record of all positions held by this employee.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EmployeeJobTitleHistory history={jobTitleHistory} />
                            </CardContent>
                        </Card>

                        <AssignJobTitleDialog
                            employeeId={initialData.id}
                            jobTitles={jobTitles}
                            open={isJobTitleDialogOpen}
                            onOpenChange={setIsJobTitleDialogOpen}
                            onSuccess={handleJobTitleAssigned}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
