"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground">Dashboard</h1>
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
            <LogOut size={20} />
            Logout
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-2">Welcome</h2>
            <p className="text-gray-500">You have successfully completed the onboarding flow.</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
