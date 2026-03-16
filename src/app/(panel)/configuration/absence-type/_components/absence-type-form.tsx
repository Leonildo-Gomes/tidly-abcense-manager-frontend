"use client";

import { AbsenceTypeResponse } from "@/app/(panel)/_shared/absence-type/absence-type-response.schema";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createAbsenceType, updateAbsenceType } from "../_actions/absence-type.action";
import { AbsenceTypeFormValues, absenceTypeSchema } from "../_schemas/absence-type.schema";

// Colors for selection
const colorOptions = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#10b981" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Gray", value: "#6b7280" },
];



interface AbsenceTypeFormProps {
  initialData?: AbsenceTypeResponse;
  isEditMode?: boolean;
}

export default function AbsenceTypeForm({ initialData, isEditMode = false }: AbsenceTypeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AbsenceTypeFormValues>({
    resolver: zodResolver(absenceTypeSchema),
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      color: initialData?.color || "#3b82f6",
      requiredAttachment: initialData?.requiredAttachment ?? false,
      description: initialData?.description || "",
      status: initialData?.isActive ?? true,
    },
  });

  async function onSubmit(values: AbsenceTypeFormValues) {
    setIsSubmitting(true);
    try {
      console.log("values", values);
      let response;
      if (isEditMode && initialData?.id) {
        response = await updateAbsenceType(initialData.id, values);
        if (!response.success) {
          toast.error(response.error);
          return;
        }
        toast.success("Absence type updated successfully.");
      } else {
        response = await createAbsenceType(values);
        if (!response.success) {
          toast.error(response.error);
          return;
        }
        toast.success("Absence type created successfully.");
      }
      router.push("/configuration/absence-type");
      router.refresh();
    } catch (err: any) {
      console.error("Submit Error:", err);
      toast.error(err.message || "Failed to save absence type.");
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
            {isEditMode ? "Edit Absence Type" : "New Absence Type"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? "Update existing absence type details."
              : "Create a new absence type for your organization."}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Absence Type Details</CardTitle>
          <CardDescription>
            Configure the basic information for this absence type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Vacation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. VAC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description for this absence type"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Label</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => field.onChange(color.value)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                                        field.value === color.value 
                                        ? "ring-2 ring-primary ring-offset-2 border-transparent scale-110" 
                                        : "border-transparent hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                          This color will be used to display this absence type in the calendar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="requiredAttachment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Required Attachment</FormLabel>
                          <FormDescription>
                            Require a file attachment for this absence type.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active Status</FormLabel>
                          <FormDescription>
                            Inactive types cannot be selected.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[150px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {isEditMode ? "Update Type" : "Create Type"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
