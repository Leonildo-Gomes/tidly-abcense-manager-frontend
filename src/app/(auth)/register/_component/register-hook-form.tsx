"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VerifyHookForm from "./verify-hook-form";

const signUpSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters").nonempty("Password is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;


export default function RegisterHookForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });



  if (!isLoaded) return null;

  const onSignUpSubmit = async (data: SignUpFormData) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      // Ideally, show toast error here
      signUpForm.setError("root", {
        message: err.errors?.[0]?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };



  if (verifying) {
    return <VerifyHookForm email={signUpForm.getValues("email")} />;
  }

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
        className="space-y-5"
      >
          <FormField
            control={signUpForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="relative group">
                <FormLabel
                  className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                    focusedField === "firstName"
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  First Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === "firstName"
                          ? "text-primary"
                          : "text-gray-400"
                      } z-10`}
                    />
                    <Input
                      {...field}
                      placeholder="John"
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => {
                        field.onBlur();
                        setFocusedField(null);
                      }}
                      className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-6 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="relative group">
                <FormLabel
                  className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                    focusedField === "lastName"
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  Last Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === "lastName"
                          ? "text-primary"
                          : "text-gray-400"
                      } z-10`}
                    />
                    <Input
                      {...field}
                      placeholder="Doe"
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => {
                        field.onBlur();
                        setFocusedField(null);
                      }}
                      className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-6 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative group">
              <FormLabel
                className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                  focusedField === "email" ? "text-primary" : "text-gray-400"
                }`}
              >
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === "email" ? "text-primary" : "text-gray-400"
                    } z-10`}
                  />
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@company.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => {
                      field.onBlur();
                      setFocusedField(null);
                    }}
                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-6 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative group">
              <FormLabel
                className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                  focusedField === "password"
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === "password"
                        ? "text-primary"
                        : "text-gray-400"
                    } z-10`}
                  />
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => {
                      field.onBlur();
                      setFocusedField(null);
                    }}
                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-6 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {signUpForm.formState.errors.root && (
            <div className="text-red-500 text-sm text-center">
                {signUpForm.formState.errors.root.message}
            </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-base flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
