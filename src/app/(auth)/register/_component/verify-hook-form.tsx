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
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifySchema = z.object({
  code: z.string().min(6, "Code must be 6 digits"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

interface VerifyHookFormProps {
  email: string;
}

export default function VerifyHookForm({ email }: VerifyHookFormProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const verifyForm = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  if (!isLoaded) return null;

  const onVerifySubmit = async (data: VerifyFormData) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/home");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      verifyForm.setError("code", {
        message: err.errors?.[0]?.message || "Invalid code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...verifyForm}>
      <form
        onSubmit={verifyForm.handleSubmit(onVerifySubmit)}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Verify your email
          </h3>
          <p className="text-sm text-gray-500">
            We sent a code to {email}
          </p>
        </div>

        <FormField
          control={verifyForm.control}
          name="code"
          render={({ field }) => (
            <FormItem className="relative group">
              <FormLabel
                className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${
                  focusedField === "code" ? "text-primary" : "text-gray-400"
                }`}
              >
                Verification Code
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="123456"
                    onFocus={() => setFocusedField("code")}
                    onBlur={() => {
                      field.onBlur();
                      setFocusedField(null);
                    }}
                    className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-6 px-4 text-center text-2xl tracking-widest text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-base flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Verify Email <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
