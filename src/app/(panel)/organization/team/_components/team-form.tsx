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
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
import { EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";
import { TeamResponse } from "@/app/(panel)/_shared/team/team-response.schema";
import { TeamLeaderHistoryResponse } from "@/app/(panel)/_shared/team/team-leader.schema";
import { toast } from "sonner";
import createTeamAction, { updateTeamAction } from "../_actions/team.action";
import { TeamFormValues, teamSchema } from "../_schemas/team.schema";
import { AssignLeaderDialog } from "./assign-leader-dialog";
import { TeamLeaderHistory } from "./team-leader-history";

interface TeamFormProps {
  initialData?: TeamResponse | null;
  departments: DepartmentResponse[];
  employees?: EmployeeResponse[];
  leaderHistory?: TeamLeaderHistoryResponse[];
}

export default function TeamForm({ initialData, departments, employees = [], leaderHistory = [] }: TeamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLeaderDialogOpen, setIsLeaderDialogOpen] = useState(false);

  const isEditing = !!initialData?.id;
  const currentLeader = leaderHistory.find((h) => !h.endDate) ?? null;

  const title = isEditing ? "Edit Team" : "Create Team";
  const description = isEditing
    ? "Edit team details."
    : "Add a new team to your organization.";
  const action = isEditing ? "Save Changes" : "Create Team";

  const defaultValues: TeamFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    departmentId: initialData?.departmentId || "",
    status: initialData ? initialData.isActive : true,
  };

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  const onSubmit = async (data: TeamFormValues) => {
    setIsLoading(true);

    try {
        let response;
        if (initialData?.id) {
            response = await updateTeamAction(initialData.id, data);
        } else {
            response = await createTeamAction(data);
        }

        if (response?.error) {
            toast.error(response.error);
            return;
        }

        toast.success(`Team ${isEditing ? "updated" : "created"} successfully!`);
        router.push("/organization/team");
        router.refresh();
    } catch (error: any) {
        console.error("Error submitting team:", error);
        toast.error(error?.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleLeaderAssigned = () => {
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
        {/* --- Team Info Card --- */}
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

                    {/* Department */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="departmentId"
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
                                            <SelectItem key={dept.id} value={dept.id}>
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
                                    ? "Team is active and visible."
                                    : "Team is inactive and hidden."}
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

        {/* --- Team Leader Section (Edit only) --- */}
        {isEditing && (
            <>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Team Leader</CardTitle>
                            <CardDescription>
                                The employee responsible for leading this team.
                            </CardDescription>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsLeaderDialogOpen(true)}
                            disabled={employees.length === 0}
                        >
                            <UserCog className="mr-2 h-4 w-4" />
                            {currentLeader ? "Change Leader" : "Assign Leader"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {currentLeader ? (
                            <div className="flex items-center gap-3 rounded-lg border p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <UserCog className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{currentLeader.leaderName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Leader since {currentLeader.startDate}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 rounded-lg border border-dashed p-4 text-muted-foreground">
                                <UserX className="h-5 w-5" />
                                <p className="text-sm">No leader assigned to this team.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Leader History</CardTitle>
                        <CardDescription>
                            Historical record of all leaders for this team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TeamLeaderHistory history={leaderHistory} />
                    </CardContent>
                </Card>

                <AssignLeaderDialog
                    teamId={initialData.id}
                    employees={employees}
                    open={isLeaderDialogOpen}
                    onOpenChange={setIsLeaderDialogOpen}
                    onSuccess={handleLeaderAssigned}
                />
            </>
        )}
      </div>
    </div>
  );
}
