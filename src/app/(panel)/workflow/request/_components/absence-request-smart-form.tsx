"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  type: z.string().min(1, "Select an absence type"),
  startDate: z.date().nonoptional("Start date is required"),
  days: z.coerce.number().min(1, "At least 1 day is required"),
  reason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AbsenceRequestSmartForm() {
  const { user } = useUser();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      days: 1,
      reason: "",
    },
  });

  const startDate = form.watch("startDate");
  const days = form.watch("days");

  // Auto-calculate End Date
  useEffect(() => {
    if (startDate && days > 0) {
      // Simple calculation: Add days - 1 (inclusive)
      // Todo: Consider business days/holidays in future iterations
      const calculatedEnd = addDays(startDate, days - 1);
      setEndDate(calculatedEnd);
    } else {
      setEndDate(undefined);
    }
  }, [startDate, days]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log({ ...data, endDate });
    toast.success("Absence request submitted successfully!");
    setIsLoading(false);
    form.reset();
    setEndDate(undefined);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/10 overflow-hidden">
      {/* Header / Employee Card */}
      <div className="bg-primary/5 p-6 border-b border-primary/10">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg text-foreground">
              {user?.fullName}
            </h3>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                Active
              </span>
              <span className="text-xs text-muted-foreground">
                • 12 days available
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Absence Type</FormLabel>
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
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Day</SelectItem>
                      <SelectItem value="remote">Remote Work</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Smart Preview Section */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Summary
                </span>
                {endDate && (
                  <span className="text-xs font-medium text-primary">
                    Return: {format(addDays(endDate, 1), "MMM d")}
                  </span>
                )}
              </div>

              {startDate && endDate ? (
                <div className="text-sm">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">From</div>
                      <div className="font-bold text-gray-700">
                        {format(startDate, "MMM d")}
                      </div>
                    </div>
                    <div className="h-px bg-gray-300 w-8 mx-2 relative">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 bg-white px-1">
                        {days}d
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400">To</div>
                      <div className="font-bold text-gray-700">
                        {format(endDate, "MMM d")}
                      </div>
                    </div>
                  </div>

                  {/* Mini Calendar Preview - Visual only */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                     <div className="flex items-center justify-center pointer-events-none opacity-90 scale-90 origin-top">
                        <Calendar
                            mode="range"
                            selected={{ from: startDate, to: endDate }}
                            hideNavigation
                            className="rounded-md border shadow-none bg-white"
                        />
                     </div>
                  </div>

                </div>
              ) : (
                <div className="text-center text-sm text-gray-400 py-4 italic">
                  Select a start date and duration to see the schedule.
                </div>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
