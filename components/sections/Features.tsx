"use client";

import { motion } from "motion/react";
import { MapPin, Bus, Wallet, ShieldCheck, Clock, Stars } from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="py-24 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            Our Standards
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight"
          >
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0044ff] to-[#00e1ff]">
              Excellence.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 auto-rows-[280px] md:auto-rows-[320px]">
          {/* Large Card (Left) - Budget Friendly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-10 lg:p-12 flex flex-col justify-end"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00e1ff]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#00e1ff]/20 transition-colors duration-700"></div>

            {/* Background Image / Abstract Graphic */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2942&auto=format&fit=crop"
                alt="Abstract representation"
                fill
                className="object-cover opacity-10 mix-blend-luminosity group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#00e1ff]/20 border border-[#00e1ff]/30 text-cyan-400 flex items-center justify-center mb-6 backdrop-blur-md shadow-2xl group-hover:bg-[#00e1ff]/40 transition-all duration-500">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Budget Friendly</h3>
              <p className="text-slate-300 leading-relaxed max-w-lg text-lg">
                Experience premium group travel without the premium price tag. Our transparent pricing structure is
                designed to provide you with maximum value, ensuring absolutely zero hidden fees or unexpected
                surcharges.
              </p>
            </div>
          </motion.div>

          {/* Small Card 1 (Top Right) - Widespread Availability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 p-8 flex flex-col hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0044ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-12 h-12 rounded-xl bg-[#0044ff]/10 border border-[#0044ff]/20 text-blue-400 flex items-center justify-center mb-auto backdrop-blur-md group-hover:bg-[#0044ff] group-hover:text-white transition-all duration-500 z-10">
              <MapPin className="w-5 h-5" />
            </div>

            <div className="mt-8 z-10 relative">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Widespread Range</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Strategically placed hubs covering major routes nationwide for zero wait times.
              </p>
            </div>
          </motion.div>

          {/* Small Card 2 (Bottom Right) - Premium Comfort */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 p-8 flex flex-col hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-auto backdrop-blur-md group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 z-10">
              <Bus className="w-5 h-5" />
            </div>

            <div className="mt-8 z-10 relative">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Premium Comfort</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Ergonomic seating, climate control, and unmatched legroom on every single trip.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
