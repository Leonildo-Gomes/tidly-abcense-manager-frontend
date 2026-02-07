"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for user registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect to login or onboarding
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/10 border border-white/50 p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary"
            >
              <User size={32} />
            </motion.div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-foreground/60 text-sm">
              Sign up to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name Input */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium transition-colors duration-200 ${
                  focusedField === "name" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 pl-11 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-gray-400"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
                <User
                  size={20}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "name" ? "text-primary" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium transition-colors duration-200 ${
                  focusedField === "email" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 pl-11 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-gray-400"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                <Mail
                  size={20}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email" ? "text-primary" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium transition-colors duration-200 ${
                  focusedField === "password" ? "text-primary" : "text-foreground/60"
                }`}
              >
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pl-11 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-gray-400"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <Lock
                  size={20}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password" ? "text-primary" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-foreground/60">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
