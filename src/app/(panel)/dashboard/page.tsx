"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
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
