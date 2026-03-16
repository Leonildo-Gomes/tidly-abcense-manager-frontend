"use client";

import { Button } from "@/components/ui/button";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save, UserCog, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import createDepartmentAction, { updateDepartmentAction } from "../_actions/department.action";

import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { DepartmentManagerHistoryResponse } from "@/app/(panel)/_shared/departments/department-manager.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
import { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { DepartmentFormValues, departmentSchema } from "../_schemas/department.schema";
import { AssignManagerDialog } from "./assign-manager-dialog";
import { DepartmentManagerHistory } from "./department-manager-history";

interface DepartmentFormProps {
  initialData?: DepartmentResponse | null;
  companies: CompanyResponse[];
  departments: DepartmentResponse[];
  employees?: EmployeeResponse[];
  managerHistory?: DepartmentManagerHistoryResponse[];
}

export default function DepartmentForm({
    initialData,
    companies,
    departments,
    employees = [],
    managerHistory = [],
}: DepartmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isManagerDialogOpen, setIsManagerDialogOpen] = useState(false);

  const isEditing = !!initialData?.id;
  const currentManager = managerHistory.find((h) => !h.endDate) ?? null;

  const title = isEditing ? "Edit Department" : "Create Department";
  const description = isEditing
    ? "Edit department details."
    : "Add a new department to your organization.";
  const action = isEditing ? "Save Changes" : "Create Department";

  const defaultValues: DepartmentFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    companyId: initialData?.companyId || "",
    parentId: initialData?.parentDepartmentId || undefined,
    status: initialData ? initialData.isActive : true,
  };

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  const selectedCompanyId = form.watch("companyId");

  const filteredParentDepartments = useMemo(() => {
    if (!selectedCompanyId) return [];
    return departments.filter(d =>
        d.companyId === selectedCompanyId &&
        d.id !== initialData?.id
    );
  }, [selectedCompanyId, initialData?.id, departments]);

  const onSubmit = async (data: DepartmentFormValues) => {
    setIsLoading(true);
    try {
        let response;
        if (initialData?.id) {
            response = await updateDepartmentAction(initialData.id, data);
        } else {
            response = await createDepartmentAction(data);
        }

        if (response?.error) {
            toast.error(response.error);
            return;
        }

        toast.success(`Department ${isEditing ? "updated" : "created"} successfully!`);
        router.push("/organization/department");
        router.refresh();
    } catch (error: any) {
        toast.error(error?.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleManagerAssigned = () => {
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2"
      >
        <ArrowLeft size={16} />
        Back to Departments
      </Button>

      <div className="grid gap-6">
        {/* --- Department Info Card --- */}
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Basic Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Department Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Engineering" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Department Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="ENG" {...field} />
                                </FormControl>
                                <FormDescription>Unique identifier.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Hierarchy */}
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
                                        {companies.map(company => (
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
                            name="parentId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Parent Department (Optional)</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedCompanyId || filteredParentDepartments.length === 0}
                                >
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={
                                            !selectedCompanyId ? "Select a company first" :
                                            filteredParentDepartments.length === 0 ? "No parents available" :
                                            "Select a parent"
                                        } />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {filteredParentDepartments.map(dept => (
                                            <SelectItem key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Reports to this department.</FormDescription>
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
                                    ? "Department is active and visible."
                                    : "Department is inactive and hidden."}
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

        {/* --- Department Manager Section (Edit only) --- */}
        {isEditing && (
            <>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Department Manager</CardTitle>
                            <CardDescription>
                                The employee responsible for this department.
                            </CardDescription>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsManagerDialogOpen(true)}
                            disabled={employees.length === 0}
                        >
                            <UserCog className="mr-2 h-4 w-4" />
                            {currentManager ? "Change Manager" : "Assign Manager"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {currentManager ? (
                            <div className="flex items-center gap-3 rounded-lg border p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <UserCog className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{currentManager.managerName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Manager since {currentManager.startDate}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 rounded-lg border border-dashed p-4 text-muted-foreground">
                                <UserX className="h-5 w-5" />
                                <p className="text-sm">No manager assigned to this department.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Manager History</CardTitle>
                        <CardDescription>
                            Historical record of all managers for this department.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DepartmentManagerHistory history={managerHistory} />
                    </CardContent>
                </Card>

                <AssignManagerDialog
                    departmentId={initialData.id}
                    employees={employees}
                    open={isManagerDialogOpen}
                    onOpenChange={setIsManagerDialogOpen}
                    onSuccess={handleManagerAssigned}
                />
            </>
        )}
      </div>
    </div>
  );
}
