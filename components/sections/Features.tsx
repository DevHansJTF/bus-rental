"use client";

import { motion } from "motion/react";
import { MapPin, Bus, Wallet, ShieldCheck, Clock, Stars } from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            Our Standards
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight"
          >
            Built for <span className="text-zinc-500 dark:text-zinc-400">Excellence.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 auto-rows-auto md:auto-rows-[320px]">
          {/* Large Card (Left) - Budget Friendly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 sm:p-10 lg:p-12 flex flex-col justify-end hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[380px] md:min-h-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/budget-friendly.jpg"
                alt="Premium Bus"
                fill
                className="object-cover opacity-[0.4] dark:opacity-[0.3] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-zinc-900 dark:via-zinc-900/80 to-transparent"></div>
            </div>

            <div className="relative z-10 mt-auto max-w-xl">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-6 shadow-sm group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-500">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
                Budget Friendly
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
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
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
              <Image
                src="/nationwide.jpg"
                alt="Maps and Navigation"
                fill
                className="object-cover opacity-[0.3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-auto shadow-sm group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-500 z-10 relative">
              <MapPin className="w-5 h-5" />
            </div>

            <div className="mt-8 z-10 relative">
              <h3 className="text-xl font-heading font-bold text-zinc-900 dark:text-white mb-2">Widespread Range</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Strategically placed hubs covering major routes nationwide for fast departures and zero wait times.
              </p>
            </div>
          </motion.div>

          {/* Small Card 2 (Bottom Right) - Premium Comfort */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
              <Image
                src="/premium-comfort.jpg"
                alt="Bus Interior"
                fill
                className="object-cover opacity-[0.3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center mb-auto shadow-sm group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-500 z-10 relative">
              <Bus className="w-5 h-5" />
            </div>

            <div className="mt-8 z-10 relative">
              <h3 className="text-xl font-heading font-bold text-zinc-900 dark:text-white mb-2">Premium Comfort</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Ergonomic seating, refined climate control, and unmatched legroom on every single trip.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
