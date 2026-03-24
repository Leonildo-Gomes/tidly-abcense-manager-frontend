"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { addDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock, Loader2, Plane } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface RequestFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  endDate?: Date;
  isLoading: boolean;
}

export function RequestForm({ form, onSubmit, endDate, isLoading }: RequestFormProps) {
  return (
    <Card className="flex-1 shadow-sm rounded-lg border-primary/10">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">Create Request</CardTitle>
        <CardDescription className="text-sm">Configure your leave parameters below.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="absenceTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Absence Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-md border-primary/10 bg-muted/20 focus:ring-primary/20">
                        <SelectValue placeholder="What kind of leave?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-md border-primary/10 shadow-lg">
                      <SelectItem value="vacation" className="h-12 py-3">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-orange-50 text-orange-600">
                                <Plane className="w-4 h-4" /> 
                            </div>
                            <span className="font-medium">Vacation</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sick" className="h-12 py-3">
                         <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded bg-red-50 text-red-600">
                                <Clock className="w-4 h-4" /> 
                            </div>
                            <span className="font-medium">Sick Leave</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="personal" className="h-12">Personal Day</SelectItem>
                      <SelectItem value="remote" className="h-12">Remote Work</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="referenceYear"
                render={({ field }) => {
                  const currentYear = new Date().getFullYear();
                  const years = [currentYear - 1, currentYear, currentYear + 1];
                  
                  return (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reference Year</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-md border-primary/10 bg-muted/20 focus:ring-primary/20">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md border-primary/10 shadow-lg">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="h-12 py-3">
                              <span className="font-medium">{year}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left font-medium rounded-md border-primary/10 bg-muted/20 hover:bg-muted/40 transition-colors",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick date</span>
                            )
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-40" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-md border-primary/10 shadow-xl" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          className="rounded-md"
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
                name="totalDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input 
                            type="number" 
                            min={1} 
                            className="h-12 rounded-md border-primary/10 bg-muted/20 pr-12 focus-visible:ring-primary/20" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase group-focus-within:text-primary transition-colors">Days</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Note (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                        placeholder="Why are you requesting this?" 
                        className="resize-none min-h-[100px] rounded-md border-primary/10 bg-muted/20 focus-visible:ring-primary/20" 
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AnimatePresence>
              {endDate && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="rounded-md border border-primary/10 bg-primary/2 p-6 shadow-inner"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Return Date</span>
                        <span className="flex items-center text-sm font-bold text-primary">
                            {format(addDays(endDate, 1), "EEEE, MMM d")}
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                        </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />
                        Calculation includes weekends and holidays.
                    </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button className="w-full h-14 text-sm font-bold uppercase tracking-widest rounded-md shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98]" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                </>
              ) : (
                "Submit for Approval"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
