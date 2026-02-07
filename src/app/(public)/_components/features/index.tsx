"use client";

import { motion } from "framer-motion";
import {
    Building2,
    Calendar,
    Settings
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cta font-bold uppercase tracking-wider text-sm">Everything you need</span>
          <h2 className="text-4xl font-serif font-bold mt-3 mb-4 text-foreground">Organization made simple</h2>
          <p className="text-gray-500 text-lg">
            From complex corporate structures to individual holiday requests, we handle it all with elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             {
               title: "Smart Monitoring",
               desc: "Real-time overview of who's in and who's out. Spot calendar conflicts before they happen.",
               icon: Calendar,
             },
             {
               title: "Full Organization Support",
               desc: "Register Companies, Departments, Teams and Employees with unlimited hierarchy depth.",
               icon: Building2,
             },
             {
               title: "Custom Holiday Settings",
               desc: "Configure regional holidays, allowance rules, and carry-over policies per department.",
               icon: Settings,
             }
           ].map((feature, idx) => (
             <motion.div 
               key={idx}
               whileHover={{ y: -5 }}
               className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-50"
             >
               <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary mb-6">
                 <feature.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
               <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
