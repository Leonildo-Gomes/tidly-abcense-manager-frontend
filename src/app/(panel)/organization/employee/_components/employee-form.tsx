"use client";
import { Gender, GENDER_OPTIONS } from "@/app/(panel)/_shared/employee/gender.enum";
import { Role, ROLE_OPTIONS } from "@/app/(panel)/_shared/employee/role.enum";
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
import { ArrowLeft, CalendarIcon, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createEmployee, updateEmployee } from "../_actions/create-employee.action";
import { EmployeeFormValues, employeeSchema } from "../_schemas/employee.schema";
import { EmployeeFormProps } from "../_types/employee.types";

export default function EmployeeForm({ initialData, companies, departments, teams }: EmployeeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { organization, isLoaded } = useOrganization();

  const title = initialData ? "Edit Employee" : "Create Employee";
  const description = initialData
    ? "Edit employee details."
    : "Add a new employee to your organization.";
  const action = initialData ? "Save Changes" : "Create Employee";

  const defaultValues: EmployeeFormValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || Gender.MALE,
    companyId: initialData?.companyId || "",
    teamId: initialData?.teamId || "",
    role: initialData?.role || Role.MEMBER, // Default for new invites
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate,
    status: initialData?.isActive || true, 
  };
    

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  // Watch companyId to filter teams
  const selectedCompanyId = form.watch("companyId");

  const filteredTeams = useMemo(() => {
    if (!selectedCompanyId) return [];
    
    // Find all departments that belong to the selected company
    const companyDeptIds = departments
        .filter(d => d.companyId === selectedCompanyId)
        .map(d => d.id);
        
    // Return only teams that belong to those departments
    return teams.filter(t => companyDeptIds.includes(t.departmentId));
  }, [selectedCompanyId, departments, teams]);

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsLoading(true);
    try {
      console.log("Submitting data:", data);
       let response;
      // If creating a new employee, send the Clerk Organization Invite
      if (initialData?.id) {
       
        // Editing logic here
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
          role: data.role as any, // Clerk types expect specific strings
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
                                        {filteredTeams.map(team => (
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
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
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
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
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
                                    date < new Date("1900-01-01")
                                    }
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
                            <FormLabel className="text-base">
                                Active Status
                            </FormLabel>
                            <FormDescription>
                                {field.value 
                                    ? "Employee is active in the system." 
                                    : "Employee is inactive."}
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
