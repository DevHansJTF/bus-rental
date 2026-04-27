"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function CTAFooter() {
  return (
    <section id="contact" className="py-12 bg-transparent pb-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center md:items-stretch"
        >
          {/* Decorative Background Assets */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px]"></div>

          <div className="p-10 md:p-16 lg:p-20 relative z-20 w-full md:w-[60%] flex text-center md:text-left flex-col justify-center items-center md:items-start group">
            {/* Outline Text Reveal */}
            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4 relative">
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                Ready to
              </span>{" "}
              <br className="hidden md:block" />
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">move?</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg max-w-sm mb-12 font-medium">
              Join thousands of satisfied customers who trust OmniBus for their premium travel needs. Let&apos;s elevate
              your journey.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#020617] px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] w-fit inline-flex items-center gap-2"
            >
              Book Your Ride
            </motion.button>
          </div>

          <div className="w-full md:w-[40%] bg-white/5 border-t md:border-t-0 md:border-l border-white/10 p-10 md:p-16 flex flex-col justify-center gap-8 backdrop-blur-md relative z-20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Contact Us</h3>
            <div className="space-y-8">
              <a
                href="tel:09916912242"
                className="flex items-center gap-4 hover:text-blue-400 transition-colors group w-fit"
              >
                <div className="bg-white/5 p-4 rounded-2xl text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border border-white/5">
                  <Phone className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Call Us</p>
                  <span className="text-xl font-bold tracking-wider text-white group-hover:text-blue-400 mt-1 block">
                    09916912242
                  </span>
                </div>
              </a>
              <a
                href="mailto:busrental@gmail.com"
                className="flex items-center gap-4 hover:text-blue-400 transition-colors group w-fit"
              >
                <div className="bg-white/5 p-4 rounded-2xl text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border border-white/5">
                  <Mail className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email Us</p>
                  <span className="text-lg font-medium text-white group-hover:text-blue-400 mt-1 block">
                    busrental@gmail.com
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-4 group w-fit">
                <div className="bg-white/5 p-4 rounded-2xl text-slate-300 border border-white/5">
                  <MapPin className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Location</p>
                  <span className="text-lg font-medium text-white mt-1 block">Malvar, Batangas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center px-4">
          <div className="font-heading font-bold text-xl tracking-tighter text-white/50 mb-4 md:mb-0">
            Omni<span className="text-blue-500/50">Bus</span>
          </div>
          <div className="text-center text-slate-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} OmniBus Rental. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
