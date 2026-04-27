"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function CTAFooter() {
  return (
    <section
      id="contact"
      className="pt-12 pb-32 bg-zinc-50 dark:bg-zinc-950 relative z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-zinc-950 rounded-[3xl] lg:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center md:items-stretch"
        >
          {/* Subtle dot pattern background inside the dark container */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          ></div>

          <div className="p-10 md:p-16 lg:p-24 relative z-20 w-full md:w-[60%] flex text-center md:text-left flex-col justify-center items-center md:items-start group">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 text-white">
              Ready to <br className="hidden md:block" />
              <span className="text-zinc-500">move?</span>
            </h2>

            <p className="text-zinc-400 text-base md:text-lg max-w-sm mb-12 font-medium leading-relaxed">
              Join thousands of satisfied customers who trust OmniBus for their premium travel needs. Let&apos;s elevate
              your journey.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-zinc-950 px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl w-fit inline-flex items-center gap-2"
            >
              Book Your Ride
            </motion.button>
          </div>

          <div className="w-full md:w-[40%] bg-zinc-900/50 dark:bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-800 dark:border-zinc-800 p-10 md:p-16 flex flex-col justify-center gap-8 relative z-20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Contact Us</h3>
            <div className="space-y-8">
              <a
                href="tel:09916912242"
                className="flex items-center gap-5 hover:text-white transition-colors group w-fit"
              >
                <div className="bg-zinc-800 p-4 rounded-2xl text-zinc-300 group-hover:bg-white group-hover:text-zinc-900 transition-all duration-300 border border-zinc-700">
                  <Phone className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Call Us</p>
                  <span className="text-xl font-bold tracking-wider text-zinc-100 group-hover:text-white mt-1 block">
                    09916912242
                  </span>
                </div>
              </a>
              <a
                href="mailto:busrental@gmail.com"
                className="flex items-center gap-5 hover:text-white transition-colors group w-fit"
              >
                <div className="bg-zinc-800 p-4 rounded-2xl text-zinc-300 group-hover:bg-white group-hover:text-zinc-900 transition-all duration-300 border border-zinc-700">
                  <Mail className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Us</p>
                  <span className="text-lg font-medium text-zinc-100 group-hover:text-white mt-1 block">
                    busrental@gmail.com
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-5 group w-fit">
                <div className="bg-zinc-800 p-4 rounded-2xl text-zinc-300 border border-zinc-700">
                  <MapPin className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Location</p>
                  <span className="text-lg font-medium text-zinc-100 mt-1 block">Malvar, Batangas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center px-4 pt-8 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="font-heading font-bold text-xl tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4 md:mb-0">
            Omni<span className="text-zinc-400 dark:text-zinc-500">Bus</span>
          </div>
          <div className="text-center text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} OmniBus Rental. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
