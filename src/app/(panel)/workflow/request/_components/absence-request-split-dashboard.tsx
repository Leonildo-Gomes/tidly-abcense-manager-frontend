"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Keeping for the small date picker popover
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths
} from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Clock, Loader2, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  type: z.string().min(1, "Select an absence type"),
  startDate: z.date(),
  days: z.coerce.number().min(1, "At least 1 day is required"),
  reason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AbsenceRequestSplitDashboard() {
  const { user } = useUser();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      const calculatedEnd = addDays(startDate, days - 1);
      setEndDate(calculatedEnd);
      
      // Auto-switch calendar view to the selected start date's month
      if (!isSameMonth(startDate, currentMonth)) {
          setCurrentMonth(startDate);
      }
    } else {
      setEndDate(undefined);
    }
  }, [startDate, days]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Absence request submitted successfully!");
    setIsLoading(false);
    form.reset();
    setEndDate(undefined);
  };

  // --- Custom Calendar Logic ---
  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const isDaySelected = (day: Date) => {
      if (!startDate || !endDate) return false;
      return day >= startDate && day <= endDate;
  };

  const isStartDay = (day: Date) => startDate && isSameDay(day, startDate);
  const isEndDay = (day: Date) => endDate && isSameDay(day, endDate);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[700px]">
      {/* Left Column: Form & Context */}
      <div className="xl:col-span-4 flex flex-col gap-6">
        {/* Employee Context Card */}
        <Card className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/20">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16 border-4 border-background shadow-lg">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg">{user?.fullName}</h3>
                        <p className="text-sm text-muted-foreground">Software Engineer</p>
                        <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Active</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-card border p-4 text-center hover:bg-muted/50 transition-colors">
                        <div className="text-3xl font-bold tracking-tighter text-primary">12</div>
                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Vacation Days</div>
                    </div>
                    <div className="rounded-xl bg-card border p-4 text-center hover:bg-muted/50 transition-colors">
                        <div className="text-3xl font-bold tracking-tighter text-orange-500">3</div>
                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">Pending</div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Request Form */}
        <Card className="flex-1 shadow-md">
          <CardHeader>
            <CardTitle>New Request</CardTitle>
            <CardDescription>Submit a new leave request for approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Absence Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vacation" className="h-11">
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded bg-orange-100 text-orange-600">
                                    <Plane className="w-4 h-4" /> 
                                </div>
                                <span>Vacation</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sick" className="h-11">
                             <div className="flex items-center gap-3">
                                <div className="p-1 rounded bg-red-100 text-red-600">
                                    <Clock className="w-4 h-4" /> 
                                </div>
                                <span>Sick Leave</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="personal" className="h-11">Personal Day</SelectItem>
                          <SelectItem value="remote" className="h-11">Remote Work</SelectItem>
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
                                  "w-full h-11 pl-3 text-left font-normal",
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
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Add any additional context..." 
                            className="resize-none min-h-[80px]" 
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Return Date</span>
                        {endDate ? (
                             <span className="flex items-center text-sm font-bold text-primary">
                                {format(addDays(endDate, 1), "EEEE, MMM d")}
                                <CheckCircle2 className="ml-2 h-4 w-4" />
                             </span>
                        ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                        )}
                    </div>
                </div>

                <Button className="w-full h-12 text-base" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
      </div>

      {/* Right Column: Custom Large Calendar Grid */}
      <div className="xl:col-span-8 h-full">
        <Card className="h-full flex flex-col shadow-md overflow-hidden border-primary/20">
            <CardHeader className="border-b bg-muted/20 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">
                            {format(currentMonth, "MMMM yyyy")}
                        </CardTitle>
                        <CardDescription>View your team's schedule and holidays.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={prevMonth}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                         <Button variant="outline" size="sm" onClick={goToToday}>
                            Today
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextMonth}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 border-b bg-muted/5">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="py-2 text-center text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                
                {/* Days Grid */}
                <div className="grid grid-cols-7 flex-1">
                    {daysInMonth.map((day, dayIdx) => {
                        const isSelected = isDaySelected(day);
                        const isStart = isStartDay(day);
                        const isEnd = isEndDay(day);
                        const isCurrentMonth = isSameMonth(day, currentMonth);
                        const isTodayDate = isToday(day);

                        return (
                            <div 
                                key={day.toString()} 
                                className={cn(
                                    "min-h-[100px] border-b border-r p-2 relative transition-all group",
                                    !isCurrentMonth && "bg-muted/5 text-muted-foreground/30",
                                    isCurrentMonth && "bg-background",
                                    isSelected && "bg-primary/5",
                                    (dayIdx % 7 === 0) && "border-l" // Left border for first column
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={cn(
                                        "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                        isTodayDate && "bg-accent text-accent-foreground font-bold",
                                        isStart && "bg-primary text-primary-foreground",
                                        isEnd && "bg-primary text-primary-foreground",
                                        !isTodayDate && !isStart && !isEnd && "text-muted-foreground"
                                    )}>
                                        {format(day, "d")}
                                    </span>
                                </div>

                                {/* Visual Bar for Selection */}
                                {isSelected && (
                                    <div className={cn(
                                        "absolute top-10 left-0 right-0 h-1.5 bg-primary/20 mx-2 rounded-full",
                                        isStart && "ml-2 left-0 bg-primary",
                                        isEnd && "mr-2 right-0 bg-primary",
                                        !isStart && !isEnd && "bg-primary/40"
                                    )} />
                                )}
                                
                                {/* Add Event Hover Button (Visual only) */}
                                {isCurrentMonth && (
                                    <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 hover:bg-primary/20 text-primary text-xs px-2 py-0.5 rounded">
                                        +
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
