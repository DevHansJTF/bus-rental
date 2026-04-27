"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [0.6, 0]);

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
      className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden min-h-[100vh] flex items-center"
    >
      {/* Parallax Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 h-[100%] w-full transform-gpu origin-top">
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2938&auto=format&fit=crop"
          alt="Bus depot from above"
          fill
          className="object-cover object-center"
          priority
          referrerPolicy="no-referrer"
        />
        <motion.div style={{ opacity }} className="absolute inset-0 bg-black mix-blend-multiply"></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              The Future of Transit
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6"
            >
              Move beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                boundaries.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed"
            >
              Experience ultimate group travel with our next-generation fleet. Real-time tracking, unmatched comfort,
              and a journey elevated.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#020617] px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] inline-flex items-center gap-2 group"
              >
                Explore Fleet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-white hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Glassmorphism Booking Console */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="backdrop-blur-3xl bg-slate-900/40 border border-white/10 p-8 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] shadow-blue-900/20 relative overflow-hidden group">
              {/* Animated Background Gradients in Console */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700"></div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-2xl font-bold text-white tracking-tight">Quick Booking</h3>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="How many people are traveling?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Where will the bus be used?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="How many days do you need the bus?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 bg-slate-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-2xl relative group/card cursor-pointer hover:bg-slate-900 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-3">
                    Recommended For You
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover/card:scale-105 transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2938&auto=format&fit=crop"
                        alt="Transit Bus"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-white text-base">Executive Class</h4>
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">Up to 30 Passengers</p>
                      <p className="text-[11px] text-slate-400 font-medium">Wi-Fi • Leather • AC</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">$120</p>
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">/ hour</p>
                    </div>
                  </div>
                  <button className="w-full mt-5 bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold py-3 rounded-xl text-sm transition-colors group-hover/card:border-blue-500/30 group-hover/card:text-blue-300">
                    Select Vehicle
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
