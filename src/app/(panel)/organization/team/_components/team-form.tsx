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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock Data for Departments
const departments = [
  { id: "dep-1", name: "Engineering" },
  { id: "dep-2", name: "Product" },
  { id: "dep-3", name: "Sales" },
  { id: "dep-4", name: "Marketing" },
  { id: "dep-5", name: "Human Resources" },
];

// Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max( 100, { message: "Name must be at most 100 characters." } ),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }).max( 15, { message: "Code must be at most 15 characters." } ),
  department: z.string().min(1, { message: "Department is required." }),
  status: z.boolean(),
});

type TeamFormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  initialData?: {
    id: string;
    name: string;
    code: string;
    department: string;
    status: "active" | "inactive";
  } | null;
}

export default function TeamForm({ initialData }: TeamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Team" : "Create Team";
  const description = initialData
    ? "Edit team details."
    : "Add a new team to your organization.";
  const action = initialData ? "Save Changes" : "Create Team";

  const defaultValues: TeamFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    department: initialData?.department || "",
    status: initialData ? initialData.status === "active" : true,
  };

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: TeamFormValues) => {
    setIsLoading(true);
    console.log("Submitting data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    router.push("/organization/team");
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
        Back to Teams
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
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Team Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Frontend Team" {...field} />
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
                                <FormLabel>Team Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="FE-001" {...field} />
                                </FormControl>
                                <FormDescription>Unique identifier.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Department</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a department" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {departments.map(dept => (
                                            <SelectItem key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                
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
                                    ? "Team is active and visible." 
                                    : "Team is inactive and hidden."}
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

                    <div className="flex justify-end pt-4 border-t">
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
