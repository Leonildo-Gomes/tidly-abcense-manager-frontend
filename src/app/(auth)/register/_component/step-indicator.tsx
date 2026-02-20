"use client";

import { Briefcase, CheckCircle2 } from "lucide-react";

type StepIndicatorProps = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      <div
        className={`flex flex-col items-center ${
          currentStep >= 1 ? "text-primary" : "text-gray-300"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            currentStep >= 1
              ? "border-primary bg-primary/10"
              : "border-gray-300"
          }`}
        >
          <Briefcase className="w-4 h-4" />
        </div>
        <span className="text-xs mt-1 font-medium">Workspace</span>
      </div>
      <div
        className={`flex-1 h-0.5 mx-2 ${
          currentStep >= 2 ? "bg-primary" : "bg-gray-200"
        }`}
      />
      <div
        className={`flex flex-col items-center ${
          currentStep >= 2 ? "text-primary" : "text-gray-300"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            currentStep >= 2
              ? "border-primary bg-primary/10"
              : "border-gray-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="text-xs mt-1 font-medium">Plan</span>
      </div>
    </div>
  );
}
