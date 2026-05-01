"use client";

import { motion } from "motion/react";

const reasons = [
  {
    title: "Flexible Choices",
    description:
      "Select from a vast array of tailored itineraries, luxury vehicle arrangements, and pick-up locations suited entirely to your group’s schedule and specific travel requirements.",
  },
  {
    title: "Awesome Support",
    description:
      "Our dedicated customer success team is available 24/7 to answer your inquiries, assist with booking changes, and guarantee a seamless, stress-free travel experience from start to finish.",
  },
  {
    title: "Maximum Freedom",
    description:
      "Enjoy complete independence to customize your route and stops. We give you the liberty to pause your journey, explore sights, and detour whenever inspiration strikes.",
  },
  {
    title: "Comfort You Deserve",
    description:
      "Indulge in plush seating, expansive legroom, and climate-controlled cabins. We prioritize your physical well-being so you arrive at your destination refreshed and fully energized.",
  },
  {
    title: "Seamless Booking",
    description:
      "Our intuitive online platform ensures reserving your bus is fast, effortless, and secure. Instant confirmations and transparent pricing leave no room for guesswork.",
  },
  {
    title: "Safe Journey",
    description:
      "Traverse securely with our highly experienced, certified drivers and top-tier fleet. Rigorous maintenance checks and stringent safety protocols protect you every mile of the way.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-32 bg-transparent relative z-10 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* Left side fixed header approach */}
          <div className="lg:w-1/2 relative">
            <div className="sticky top-40 bg-zinc-900/5 dark:bg-white/5 backdrop-blur-xl border border-zinc-900/10 dark:border-white/5 p-10 lg:p-12 rounded-[2.5rem] shadow-2xl transition-colors duration-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-900/10 dark:border-white/10 bg-zinc-900/5 dark:bg-white/5 text-zinc-800 font-semibold dark:text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 transition-colors"
              >
                Why Choose Us
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 leading-[1.1] transition-colors"
              >
                Where every trip feels out of the ordinary.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-zinc-500 dark:text-slate-400 leading-relaxed max-w-sm text-lg transition-colors text-justify"
              >
                We blend modern technology, elegant fleet design, and exceptional customer service into one holistic
                experience.
              </motion.div>
            </div>
          </div>

          {/* Right side list */}
          <div className="lg:w-1/2 flex flex-col gap-10 mt-10 lg:mt-32 relative z-20 pb-24">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative overflow-hidden backdrop-blur-xl bg-zinc-900/[0.02] dark:bg-white/[0.03] rounded-[2rem] p-8 md:p-10 border border-zinc-200 dark:border-white/10 hover:bg-zinc-900/[0.05] dark:hover:bg-white/[0.08] transition-colors duration-500 shadow-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none"></div>
                <h3 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white mb-4 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 relative z-10 flex border-b border-zinc-200 dark:border-white/5 pb-4">
                  <span className="text-blue-600/50 dark:text-blue-500/50 mr-4 font-mono font-normal">
                    0{index + 1}
                  </span>
                  {reason.title}
                </h3>
                <p className="text-zinc-500 dark:text-slate-400 leading-relaxed text-sm md:text-base relative z-10 transition-colors text-justify">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
