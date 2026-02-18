"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AbsenceRequestSmartForm from "./_components/absence-request-smart-form";
import AbsenceRequestSplitDashboard from "./_components/absence-request-split-dashboard";

export default function AbsenceRequestPage() {
  const [mode, setMode] = useState<"C" | "A">("C");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Request Absence</h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Select the option below to compare the two UI approaches.
        </p>

        <div className="flex p-1 bg-muted rounded-xl">
          <Button
            variant={mode === "C" ? "default" : "ghost"}
            onClick={() => setMode("C")}
            className="rounded-lg px-8"
          >
            Option C: Smart Form
            <span className="ml-2 bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">
              Standard
            </span>
          </Button>
          <Button
            variant={mode === "A" ? "default" : "ghost"}
            onClick={() => setMode("A")}
            className="rounded-lg px-8"
          >
            Option A: Dashboard
            <span className="ml-2 bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">
              Split View
            </span>
          </Button>
        </div>
      </div>

      <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        {mode === "C" ? (
          <div className="max-w-2xl mx-auto">
             <div className="mb-4 text-center text-sm text-gray-500">
                This option focuses on speed and simplicity, with a preview calendar.
             </div>
            <AbsenceRequestSmartForm />
          </div>
        ) : (
          <div>
            <div className="mb-4 text-center text-sm text-gray-500">
                This option gives massive context with a full side-by-side calendar.
            </div>
            <AbsenceRequestSplitDashboard />
          </div>
        )}
      </div>
    </div>
  );
}