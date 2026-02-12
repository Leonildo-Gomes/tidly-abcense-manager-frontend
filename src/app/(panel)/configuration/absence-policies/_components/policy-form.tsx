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

// Mock data - In a real app, this would come from API/Context
const mocks = {
    companies: [
        { id: "c1", name: "Acme Corp" },
        { id: "c2", name: "Globex" },
    ],
    absenceTypes: [
        { id: "at1", name: "Vacation", code: "VAC" },
        { id: "at2", name: "Sick Leave", code: "SICK" },
    ],
    departments: [
        { id: "d1", name: "Engineering" },
        { id: "d2", name: "HR" },
        { id: "d3", name: "Sales" },
    ]
}

const formSchema = z.object({
  company_id: z.string().min(1, { message: "Company is required." }),
  absence_type_id: z.string().min(1, { message: "Absence Type is required." }),
  department_id: z.string().nullable().optional(), // Null means General Rule
  max_days_per_year: z.number().min(0),
  min_notice_days: z.number().int().min(0),
});

type FormValues = z.infer<typeof formSchema>;

interface PolicyFormProps {
  initialData?: Partial<FormValues> & { id?: string };
  isEditMode?: boolean;
}

export function PolicyForm({ initialData, isEditMode = false }: PolicyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: initialData?.company_id || "",
      absence_type_id: initialData?.absence_type_id || "",
      department_id: initialData?.department_id || null, 
      max_days_per_year: initialData?.max_days_per_year || 0,
      min_notice_days: initialData?.min_notice_days || 0,
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // Convert "general" or empty string back to null if needed, though Zod handles nullable
    const payload = {
        ...values,
        department_id: values.department_id === "general" ? null : values.department_id
    }
    
    console.log("Submitting Policy:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/configuration/absence-policies");
    }, 1000);
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
                  name="company_id"
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
                            {mocks.companies.map(c => (
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
                  name="absence_type_id"
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
                            {mocks.absenceTypes.map(t => (
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
                name="department_id"
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
                          {mocks.departments.map(d => (
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
                  name="max_days_per_year"
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
                  name="min_notice_days"
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
