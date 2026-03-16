"use client";

import { HolidayType } from "@/app/(panel)/_shared/holiday/holiday-type.enum";
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
import { ArrowLeft, CalendarIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createHoliday, updateHoliday } from "../_actions/holiday.action";
import { HolidayFormValues, holidaySchema } from "../_schemas/holiday.schema";

interface HolidayFormProps {
  initialData?: HolidayFormValues & { id: string };
  isEditMode?: boolean;
}

export default function HolidayForm({ initialData, isEditMode = false }: HolidayFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: initialData?.name || "",
      date: initialData?.date || new Date(),
      type: initialData?.type ?? HolidayType.PUBLIC,
      isRecurring: initialData?.isRecurring ?? true,
      status: initialData?.status ?? true,
    },
  });

  async function onSubmit(values: HolidayFormValues) {
    setIsSubmitting(true);
    try {
      let response;
      if (isEditMode && initialData?.id) {
        response = await updateHoliday(initialData.id, values);
        if (!response.success) {
            toast.error(response.error);
            return;
        }
        toast.success("Holiday updated successfully.");
      } else {
        response = await createHoliday(values);
        if (!response.success) {
            toast.error(response.error);
            return;
        }
        toast.success("Holiday created successfully.");
      }
      router.push("/configuration/holiday");
      router.refresh();
    } catch (err: any) {
        console.error("Holiday Submit Error:", err);
        toast.error(err.message || "Failed to save holiday.");
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            {isEditMode ? "Edit Holiday" : "New Holiday"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "Update holiday details."
              : "Add a new holiday to the calendar."}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holiday Details</CardTitle>
          <CardDescription>
            Configure the holiday name, date and recurrence settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Holiday Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Constitutional Day" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        >
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value={HolidayType.PUBLIC}>Public Holiday</SelectItem>
                            <SelectItem value={HolidayType.COMPANY}>Company Holiday</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="isRecurring"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Recurring Yearly</FormLabel>
                            <FormDescription>
                                Automatically repeat this holiday every year.
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
              </div>

               <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Inactive holidays are not applied to calendars.
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

              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  <Save size={16} />
                  {isSubmitting ? "Saving..." : isEditMode ? "Update Holiday" : "Create Holiday"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
