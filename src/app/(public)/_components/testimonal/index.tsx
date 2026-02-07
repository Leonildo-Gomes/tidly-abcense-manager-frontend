"use client";

import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-serif font-bold text-foreground">Loved by HR Managers</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              text: "The most relaxing HR software I've ever used. The neomorphic design is just stunning.",
              author: "Sarah J.",
              role: "HR Director",
              img: "https://i.pravatar.cc/100?img=5"
            },
            {
              text: "Finally, a way to visualize our complex department structure without headaches.",
              author: "Mike T.",
              role: "Operations Lead",
              img: "https://i.pravatar.cc/100?img=12"
            },
            {
               text: "Sick leave tracking used to be a mess. Now it's automated and transparent.",
               author: "Elena R.",
               role: "Team Manager",
               img: "https://i.pravatar.cc/100?img=9"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-lg">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                <div>
                  <div className="font-bold text-foreground">{t.author}</div>
                  <div className="text-xs text-primary font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
