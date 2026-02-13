"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function SigninHookForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!isLoaded) return null;
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const result = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });
      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Use router.push or window.location if middleware has latency issues
        router.push("/home");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ... email field ... */}
        <FormField
          control={form.control}
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative group">
              <div className="flex justify-between items-center mb-2">
                <FormLabel
                  className={`block text-xs font-bold uppercase tracking-wider transition-colors ${
                    focusedField === "password" ? "text-primary" : "text-gray-400"
                  }`}
                >
                  Password
                </FormLabel>
                <a
                  href="#"
                  className="text-xs text-primary/80 hover:text-primary font-medium hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <FormControl>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedField === "password" ? "text-primary" : "text-gray-400"
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-base flex justify-center items-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </button>
      </form>
    </Form>
  );
}

