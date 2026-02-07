"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect to onboarding (create company) as per new flow
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8 font-medium text-sm group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-primary/10 border border-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to manage your time off</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label 
                htmlFor="email" 
                className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`} />
                <input
                  type="email"
                  id="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className={`block text-xs font-bold uppercase tracking-wider transition-colors ${focusedField === 'password' ? 'text-primary' : 'text-gray-400'}`}
                >
                  Password
                </label>
                <a href="#" className="text-xs text-primary/80 hover:text-primary font-medium hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-primary' : 'text-gray-400'}`} />
                <input
                  type="password"
                  id="password"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-gray-700 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary/5 placeholder:text-gray-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-base flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:text-primary-dark hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
