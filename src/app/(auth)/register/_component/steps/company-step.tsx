"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const companySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyNumber: z.string().min(2, "Company number must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Company number can only contain lowercase letters, numbers, and dashes"),
});

type CompanyStepProps = {
  defaultValues: { companyName?: string; companyNumber?: string };
  onNext: (data: { companyName: string; companyNumber: string }) => void;
};

export default function CompanyStep({ defaultValues, onNext }: CompanyStepProps) {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: defaultValues.companyName || "",
      companyNumber: defaultValues.companyNumber || "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-xl font-bold mb-4">Company Details</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input
            placeholder="Acme Inc."
            {...form.register("companyName")}
            className={form.formState.errors.companyName ? "border-red-500" : ""}
          />
          {form.formState.errors.companyName && (
            <p className="text-xs text-red-500">
              {form.formState.errors.companyName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Workspace Slug</Label>
          <div className="flex">
            <Input
              placeholder="acme"
              className={`rounded-l-none ${
                form.formState.errors.companyNumber ? "border-red-500" : ""
              }`}
              {...form.register("companyNumber")}
            />
          </div>
          {form.formState.errors.companyNumber && (
            <p className="text-xs text-red-500">
              {form.formState.errors.companyNumber.message}
            </p>
          )}
        </div>
        <Button onClick={form.handleSubmit(onNext)} className="w-full mt-4">
          Next: Select Plan <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
