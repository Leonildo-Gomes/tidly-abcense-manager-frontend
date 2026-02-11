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
import * as z from "zod";

// Mock Data (Should be fetched from API in real app)
const companies = [
    { id: "1", name: "Acme Corp" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Soylent Corp" },
];

const departments = [
  { id: "1", name: "Engineering", companyId: "1" },
  { id: "2", name: "Product", companyId: "1" },
  { id: "5", name: "Sales", companyId: "2" },
];

// Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max( 100, { message: "Name must be at most 100 characters." } ),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }).max( 15, { message: "Code must be at most 15 characters." } ),
  companyId: z.string().min(1, { message: "Company is required." }),
  parentId: z.string().optional(),
  status: z.boolean(),
});

type DepartmentFormValues = z.infer<typeof formSchema>;

interface DepartmentFormProps {
  initialData?: {
    id: string;
    name: string;
    code: string;
    companyId: string;
    parentId?: string;
    status: "active" | "inactive";
  } | null;
}

export default function DepartmentForm({ initialData }: DepartmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Department" : "Create Department";
  const description = initialData
    ? "Edit department details."
    : "Add a new department to your organization.";
  const action = initialData ? "Save Changes" : "Create Department";

  const defaultValues: DepartmentFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    companyId: initialData?.companyId || "",
    parentId: initialData?.parentId || undefined,
    status: initialData ? initialData.status === "active" : true,
  };

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(formSchema),
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
    console.log("Submitting data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    router.push("/organization/department");
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
                            checked={field.value}
                            onCheckedChange={field.onChange}
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
