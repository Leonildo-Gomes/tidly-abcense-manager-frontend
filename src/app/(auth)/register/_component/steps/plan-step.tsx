"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type PlanStepProps = {
  selectedPlan?: string;
  onSelect: (plan: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function PlanStep({ selectedPlan, onSelect, onNext, onBack }: PlanStepProps) {
  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold mb-4">Select a Plan</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {["free", "pro", "enterprise"].map((plan) => (
            <div
              key={plan}
              onClick={() => onSelect(plan)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === plan
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold capitalize">{plan} Plan</h3>
                {selectedPlan === plan && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {plan === "free"
                  ? "For small teams"
                  : plan === "pro"
                  ? "For growing businesses"
                  : "For large organizations"}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="flex-1">
            Next: Admin Details <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
