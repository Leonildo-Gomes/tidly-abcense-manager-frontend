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
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import createDepartmentAction, { updateDepartmentAction } from "../_actions/department.action";

import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department.schema";
import { DepartmentFormValues, departmentSchema } from "../_schemas/department.schema";

interface DepartmentFormProps {
  initialData?: DepartmentResponse | null;
  companies: CompanyResponse[];
  departments: DepartmentResponse[];
}

export default  function DepartmentForm({ initialData, companies, departments }: DepartmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log( "initialData", initialData);

  const title = initialData ? "Edit Department" : "Create Department";
  const description = initialData
    ? "Edit department details."
    : "Add a new department to your organization.";
  const action = initialData ? "Save Changes" : "Create Department";

  const defaultValues: DepartmentFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    companyId: initialData?.companyId || "",
    parentId: initialData?.parentDepartmentId || undefined,
    status: initialData ? initialData.status : true,
  };

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  // Watch companyId to filter parent departments
  const selectedCompanyId = form.watch("companyId");

  const filteredParentDepartments = useMemo(() => {
    if (!selectedCompanyId) return [];
    
    // Filter departments by company AND exclude current department (if editing) to avoid loops
    return departments.filter(d => 
        d.companyId === selectedCompanyId && 
        d.id !== initialData?.id
    );  
  }, [selectedCompanyId, initialData?.id]);

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

        toast.success(`Department ${initialData ? 'updated' : 'created'} successfully!`);
        router.push("/organization/department");
        router.refresh();
    } catch (error: any) {
        console.error("Error submitting department:", error);
        toast.error(error?.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
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
                                <FormDescription>
                                    Reports to this department.
                                </FormDescription>
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
                            <FormLabel className="text-base">
                                Active Status
                            </FormLabel>
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
      </div>
    </div>
  );
}
