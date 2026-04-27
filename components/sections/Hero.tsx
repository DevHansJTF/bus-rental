"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { ArrowRight, Calendar, Users, MapPin, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [0.3, 0]);

  // Typography animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden min-h-[95vh] flex items-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Background with softer overlay */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-x-0 top-0 h-[60vh] lg:h-[75vh] w-full transform-gpu origin-top rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2938&auto=format&fit=crop"
          alt="Premium comfortable bus interior"
          fill
          className="object-cover object-center"
          priority
          referrerPolicy="no-referrer"
        />
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-zinc-100 dark:bg-black mix-blend-multiply dark:mix-blend-multiply transition-colors"
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-zinc-50/80 dark:via-zinc-950/80 to-transparent transition-colors"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 pt-10">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-widest mb-8 w-fit shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Top Rated Premium Transit
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-6 transition-colors"
            >
              Elevate your <br />
              <span className="text-zinc-600 dark:text-zinc-400 transition-colors">group journey.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed transition-colors"
            >
              Experience ultimate comfort and reliability with our modern fleet. Perfect for corporate events, tours,
              and private group travel.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:bg-zinc-800 dark:hover:bg-white inline-flex items-center gap-2 group"
              >
                View Our Fleet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button className="px-8 py-4 rounded-xl font-bold text-lg text-zinc-900 dark:text-white bg-zinc-200/50 dark:bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 transition-colors inline-flex items-center gap-2">
                Get a Quote
              </button>
            </motion.div>

            {/* Trust Badges - New Feature */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-8 text-zinc-600 dark:text-zinc-400 pt-8 border-t border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">
                  4.9/5 (2k+ trips)
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Clean Glassmorphism Booking Console */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full mt-10 lg:mt-0"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-black/20 relative overflow-hidden group transition-colors">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Reserve Now
                </h3>
                <div className="hidden md:flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100"></div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within/input:text-zinc-900 dark:group-focus-within/input:text-zinc-100 transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Number of passengers"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                  />
                </div>

                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within/input:text-zinc-900 dark:group-focus-within/input:text-zinc-100 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                  />
                </div>

                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within/input:text-zinc-900 dark:group-focus-within/input:text-zinc-100 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Travel dates (e.g. Oct 12 - Oct 14)"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 relative group/card cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 group-hover/card:scale-105 transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2938&auto=format&fit=crop"
                        alt="Transit Bus"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-zinc-900 dark:text-zinc-50 text-base">
                        Executive Class
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                        Up to 30 Passengers
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Availability
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$120</p>
                      <p className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                        / hour
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-bold py-3.5 rounded-xl text-sm transition-colors shadow-md hover:shadow-lg">
                    Check Availability
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
