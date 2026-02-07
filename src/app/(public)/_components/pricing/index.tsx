"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif font-bold text-foreground">Simple, Transparent Pricing</h2>
             <p className="text-gray-500 mt-4 text-lg">Start with a 15-day free trial. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-end">
             {/* Starter */}
             <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-serif font-bold mb-6">15 days free</div>
                <ul className="space-y-4 mb-8 text-gray-600">
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Up to 15 employees</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Basic reporting</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Mobile app access</li>
                </ul>
                <Link href="/register" className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors flex justify-center">Start Trial</Link>
             </div>

             {/* Pro */}
             <div className="bg-primary text-white p-10 rounded-[2rem] shadow-2xl shadow-primary/30 transform scale-105 relative z-10">
                <div className="absolute top-6 right-6 bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">MOST POPULAR</div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-5xl font-serif font-bold mb-6">$79<span className="text-base font-sans font-normal text-white/70">/mo</span></div>
                <ul className="space-y-4 mb-8 text-white/90">
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-white"/> Up to 50 employees</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-white"/> Advanced Analytics</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-white"/> Priority Support</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-white"/> Slack Integration</li>
                </ul>
                <Link href="/register" className="w-full py-4 rounded-xl bg-white text-primary font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex justify-center">Start 15-Day Free Trial</Link>
             </div>

              {/* Enterprise */}
              <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-serif font-bold mb-6">Custom</div>
                <ul className="space-y-4 mb-8 text-gray-600">
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Unlimited employees</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Custom integrations</li>
                   <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/> Dedicated manager</li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-400 hover:text-gray-800 transition-colors">Contact Sales</button>
             </div>
          </div>
       </div>
    </section>
  );
}
