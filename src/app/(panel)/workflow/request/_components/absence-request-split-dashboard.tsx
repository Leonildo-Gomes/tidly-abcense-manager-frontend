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
import { absenceRequestSchema, type AbsenceRequestFormData } from "../_schemas/absence-request.schema";

// Modular Components
import { AbsenceCalendar } from "./dashboard/absence-calendar";
import { ContextCard } from "./dashboard/context-card";
import { RequestForm } from "./dashboard/request-form";

import { createAbsenceRequest } from "../_actions/absence-request.action";
import { type EmployeeResponse } from "@/app/(panel)/_shared/employee/employee-response.schema";


interface DashboardProps {
  employee?: EmployeeResponse | null;
  absenceSettings: { absenceTypeId: string; absenceTypeName: string }[];
}

export default function AbsenceRequestSplitDashboard({ employee, absenceSettings }: DashboardProps) {
    const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const form = useForm<AbsenceRequestFormData>({
    resolver: zodResolver(absenceRequestSchema),
    defaultValues: {
      absenceTypeId: "",
      referenceYear: new Date().getFullYear(),
      startDate: new Date(),
      endDate: new Date(),
      totalDays: 1,
      comment: "",
    },
  });

  const startDate = form.watch("startDate");
  const totalDays = form.watch("totalDays");

  // Auto-calculate End Date
  useEffect(() => {
    if (startDate && totalDays > 0) {
      const calculatedEnd = addDays(startDate, totalDays - 1);
      setEndDate(calculatedEnd);
      form.setValue("endDate", calculatedEnd);
      
      // Auto-switch calendar view to the selected start date's month
      if (!isSameMonth(startDate, currentMonth)) {
          setCurrentMonth(startDate);
      }
    } else {
      setEndDate(undefined);
    }
  }, [startDate, totalDays, form]);

  const onSubmit = async (data: AbsenceRequestFormData) => {
    setIsLoading(true);
    try {
      const response = await createAbsenceRequest(data);
      if (response.success) {
        toast.success("Absence request submitted successfully!");
        form.reset();
        setEndDate(undefined);
      } else {
        toast.error(response.error || "Failed to submit absence request.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
            absenceSettings={absenceSettings}
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
