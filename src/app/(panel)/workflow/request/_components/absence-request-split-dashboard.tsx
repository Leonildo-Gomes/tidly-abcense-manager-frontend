"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDays,
  addMonths,
  isSameMonth,
  subMonths
} from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Modular Components
import { AbsenceCalendar } from "./dashboard/absence-calendar";
import { ContextCard } from "./dashboard/context-card";
import { RequestForm } from "./dashboard/request-form";

import { type EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";

const formSchema = z.object({
  type: z.string().min(1, "Select an absence type"),
  startDate: z.date({
    message: "Start date is required",
  }),
  days: z.number().min(1, "At least 1 day is required"),
  reason: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AbsenceRequestSplitDashboard({ employee }: { employee?: EmployeeResponse | null }) {
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

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full min-h-[750px] font-sans">
      {/* Left Column: Form & Context */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="xl:col-span-4 flex flex-col gap-8"
      >
        <ContextCard employee={employee} />
        <RequestForm 
            form={form} 
            onSubmit={onSubmit} 
            endDate={endDate} 
            isLoading={isLoading} 
        />
      </motion.div>

      {/* Right Column: Custom Large Calendar Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="xl:col-span-8 h-full"
      >
        <AbsenceCalendar 
            currentMonth={currentMonth}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onToday={goToToday}
            startDate={startDate}
            endDate={endDate}
        />
      </motion.div>
    </div>
  );
}
