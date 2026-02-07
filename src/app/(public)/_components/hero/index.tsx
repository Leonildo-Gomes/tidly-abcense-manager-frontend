"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Building2,
    ChevronRight,
    Settings,
    Star,
    Users
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft text-primary text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-cta"></span>
            The #1 Vacation Management App
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-serif font-bold leading-tight text-foreground">
            Vacation tracking <br />
            <span className="text-primary italic">simplified.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Manage time off, sick leave, and holidays for your entire organization. Smooth, transparent, and built for peace of mind.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
              Start Free Trial <ChevronRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-100 px-8 py-3.5 rounded-full font-bold shadow-soft hover:shadow-lg transition-all">
              View Demo
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`}></div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-gray-500">Trusted by 500+ teams</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Abstract UI Representation - Soft UI / Neomorphic */}
          <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 aspect-square max-w-lg mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                   <Building2 className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">Acme Corp</h3>
                   <p className="text-xs text-gray-500">Engineering Dept</p>
                 </div>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                98% Capacity
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: "Team Alpha", leave: "2 on leave", icon: Users, color: "bg-blue-50 text-blue-600" },
                { name: "Design Studio", leave: "All present", icon: Briefcase, color: "bg-purple-50 text-purple-600" },
                { name: "DevOps", leave: "1 sick leave", icon: Settings, color: "bg-orange-50 text-orange-600" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">{item.leave}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <div className="flex justify-between text-sm text-gray-500 mb-2">
                 <span>Remaining Holidays</span>
                 <span className="font-bold text-primary">12 Days</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                 <div className="bg-primary w-[65%] h-full rounded-full"></div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
