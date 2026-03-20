"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AbsenceCalendarProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  startDate?: Date;
  endDate?: Date;
}

export function AbsenceCalendar({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  onToday,
  startDate,
  endDate 
}: AbsenceCalendarProps) {
  
  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const isDaySelected = (day: Date) => {
      if (!startDate || !endDate) return false;
      return day >= startDate && day <= endDate;
  };

  const isStartDay = (day: Date) => startDate && isSameDay(day, startDate);
  const isEndDay = (day: Date) => endDate && isSameDay(day, endDate);

  return (
    <Card className="h-full flex flex-col shadow-sm rounded-lg overflow-hidden border-primary/10">
        <CardHeader className="border-b bg-muted/3 p-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground/90">
                        {format(currentMonth, "MMMM yyyy")}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium">Team Context & Availability</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-muted/40 p-1 rounded-md border border-primary/5">
                        <Button variant="ghost" size="icon" onClick={onPrevMonth} className="h-9 w-9 rounded-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                         <Button variant="ghost" size="sm" onClick={onToday} className="px-4 text-xs font-bold uppercase tracking-tight h-9 rounded-sm">
                            Today
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onNextMonth} className="h-9 w-9 rounded-sm">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b bg-muted/2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-4 text-center text-[10px] font-bold uppercase text-muted-foreground/60 tracking-[0.2em]">
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
                                "min-h-[110px] border-b border-r p-3 relative transition-all duration-300 group",
                                !isCurrentMonth && "bg-muted/2 text-muted-foreground/20",
                                isCurrentMonth && "bg-background",
                                isSelected && "bg-primary/3",
                                (dayIdx % 7 === 0) && "border-l"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span className={cn(
                                    "text-xs font-bold w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300",
                                    isTodayDate && "ring-1 ring-primary/20 bg-primary/5 text-primary",
                                    isStart && "bg-primary text-primary-foreground shadow-md shadow-primary/20",
                                    isEnd && "bg-primary text-primary-foreground shadow-md shadow-primary/20",
                                    !isTodayDate && !isStart && !isEnd && "text-muted-foreground/80"
                                )}>
                                    {format(day, "d")}
                                </span>
                                
                                {isTodayDate && (<span className="text-[8px] font-bold text-primary tracking-tighter self-center uppercase opacity-50">Today</span>)}
                            </div>

                            {/* Selection Visual Marker */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className={cn(
                                            "absolute top-12 left-0 right-0 h-1.5 mx-2 rounded-full",
                                            isStart && "ml-3 bg-primary",
                                            isEnd && "mr-3 bg-primary",
                                            !isStart && !isEnd && "bg-primary/30"
                                        )} 
                                    />
                                )}
                            </AnimatePresence>
                            
                            {/* Status Icon/Tag placeholder */}
                            {isStart && (
                                <div className="mt-8 flex items-center gap-1 animate-in zoom-in-50 duration-500">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    <span className="text-[9px] font-bold text-primary uppercase">Vacation Start</span>
                                </div>
                            )}

                            {/* Hover Interaction */}
                            {isCurrentMonth && (
                                <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-[-2px] bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-sm border border-primary/20">
                                    SELECT
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </CardContent>
    </Card>
  );
}
