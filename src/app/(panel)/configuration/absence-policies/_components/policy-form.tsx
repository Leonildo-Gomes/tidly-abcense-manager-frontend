"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { CompanyResponse } from "@/app/(panel)/_shared/company/company-response.schema";
import { AbsenceTypeResponse } from "@/app/(panel)/_shared/absence-type/absence-type-response.schema";
import { DepartmentResponse } from "@/app/(panel)/_shared/departments/department-response.schema";
import { createAbsencePolicy, updateAbsencePolicy } from "../_actions/absence-policy.action";
import { policyFormSchema, PolicyFormValues } from "../_schemas/absence-policy.schema";

export interface PolicyFormProps {
  initialData?: Partial<PolicyFormValues> & { id?: string };
  isEditMode?: boolean;
  companies: CompanyResponse[];
  absenceTypes: AbsenceTypeResponse[];
  departments: DepartmentResponse[];
}

export function PolicyForm({ initialData, isEditMode = false, companies, absenceTypes, departments }: PolicyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      companyId: initialData?.companyId || "",
      absenceTypeId: initialData?.absenceTypeId || "",
      departmentId: initialData?.departmentId || null, 
      maxDaysPerYear: initialData?.maxDaysPerYear || 0,
      minNoticeDays: initialData?.minNoticeDays || 0,
    },
  });

  async function onSubmit(values: PolicyFormValues) {
    setIsSubmitting(true);
    
    // Convert "general" or empty string back to null if needed
    const payload = {
        ...values,
        departmentId: values.departmentId === "general" ? null : values.departmentId
    };

    try {
      const result = isEditMode && initialData?.id
         ? await updateAbsencePolicy(initialData.id, payload)
         : await createAbsencePolicy(payload as any);
         
      if (!result.success) {
         toast.error(result.errorMessage || "An error occurred");
         return;
      }
      
      toast.success(`Policy successfully ${isEditMode ? "updated" : "created"}`);
      router.push("/configuration/absence-policies");
      router.refresh(); // Tell NextJS to refresh server cache
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            {isEditMode ? "Edit Absence Policy" : "New Absence Policy"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "Update existing absence policy details."
              : "Define a new absence rule for a company or department."}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>
            Configure the specific rules for this policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {companies.map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="absenceTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Absence Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {absenceTypes.map(t => (
                                <SelectItem key={t.id} value={t.id}>{t.name} ({t.code})</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department (Scope)</FormLabel>
                    <Select 
                      onValueChange={(val) => field.onChange(val === "general" ? null : val)} 
                      defaultValue={field.value ?? "general"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem value="general" className="font-semibold">General Rule (All Departments)</SelectItem>
                          {departments.map(d => (
                              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select specific department or apply as General Rule for the company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                  control={form.control}
                  name="maxDaysPerYear"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Max Days / Year</FormLabel>
                      <FormControl>
                          <Input 
                              type="number" 
                              step="0.5" 
                              placeholder="22.5" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name="minNoticeDays"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Min Notice Days</FormLabel>
                      <FormControl>
                          <Input 
                              type="number" 
                              placeholder="0" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Policy"}
                  </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
