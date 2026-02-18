"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const userSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type UserData = z.infer<typeof userSchema>;

type UserStepProps = {
  defaultValues: Partial<UserData>;
  onNext: (data: UserData) => void;
  onBack: () => void;
  isLoading: boolean;
};

export default function UserStep({ defaultValues, onNext, onBack, isLoading }: UserStepProps) {
  const form = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      email: defaultValues.email || "",
      password: defaultValues.password || "",
    },
  });

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold mb-4">Admin Account</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input {...form.register("firstName")} />
            {form.formState.errors.firstName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input {...form.register("lastName")} />
            {form.formState.errors.lastName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...form.register("email")}
            placeholder="admin@company.com"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" {...form.register("password")} />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            type="button"
          >
            Back
          </Button>
          <Button
            onClick={form.handleSubmit(onNext)}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Complete Registration"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
