"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock Data
const companies = [
    { id: "1", name: "Acme Corp" },
    { id: "2", name: "Globex Corp" },
];

const teams = [
    { id: "1", name: "Engineering", companyId: "1" },
    { id: "2", name: "Sales", companyId: "2" },
    { id: "3", name: "Marketing", companyId: "2" },
];

// Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max( 150, { message: "Name must be at most 150 characters." } ),
  email: z.email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters." }),
  gender: z.enum(["male", "female", "other"]).nonoptional({ message: "Gender is required." }),
  companyId: z.string().min(1, { message: "Company is required." }),
  teamId: z.string().min(1, { message: "Team is required." }),
  startDate: z.date().nonoptional({ message: "Start date is required." }),
  endDate: z.date().optional(),
  status: z.boolean(),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female" | "other";
    companyId: string;
    teamId: string;
    startDate: Date;
    endDate?: Date;
    status: "active" | "inactive";
  } | null;
}

export default function EmployeeForm({ initialData }: EmployeeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Employee" : "Create Employee";
  const description = initialData
    ? "Edit employee details."
    : "Add a new employee to your organization.";
  const action = initialData ? "Save Changes" : "Create Employee";

  const defaultValues: EmployeeFormValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || "male",
    companyId: initialData?.companyId || "",
    teamId: initialData?.teamId || "",
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate,
    status: initialData ? initialData.status === "active" : true,
  };

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch companyId to filter teams
  const selectedCompanyId = form.watch("companyId");

  const filteredTeams = useMemo(() => {
    if (!selectedCompanyId) return [];
    return teams.filter(t => t.companyId === selectedCompanyId);
  }, [selectedCompanyId]);

  const onSubmit = async (data: EmployeeFormValues) => {
    setIsLoading(true);
    console.log("Submitting data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    router.push("/organization/employee");
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
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
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
                                    initialFocus
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
                                    initialFocus
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
