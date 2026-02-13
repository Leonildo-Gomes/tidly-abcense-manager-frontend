"use client"
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import RegisterHookForm from "./_component/register-hook-form";

export default function RegisterUserPage() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

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
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-secondary to-primary"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Create Account</h1>
            <p className="text-gray-500 mt-2">Sign up to get started with Tidly</p>
          </div>

          <RegisterHookForm />

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="font-bold text-primary hover:text-primary-dark hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
