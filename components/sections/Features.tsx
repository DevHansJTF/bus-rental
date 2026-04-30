"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Bus, Wallet } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const features = [
  {
    id: 1,
    title: "Budget Friendly",
    description:
      "Experience premium group travel without the premium price tag. Our transparent pricing means absolutely zero hidden fees or unexpected surcharges. You get exactly what you pay for—excellence without compromise.",
    icon: Wallet,
    image: "/budget-friendly.jpg",
  },
  {
    id: 2,
    title: "Widespread Range",
    description:
      "Strategically placed hubs covering major routes nationwide for fast departures and zero wait times. Whether you are traversing states or exploring local gems, we are right where you need to be.",
    icon: MapPin,
    image: "/nationwide.jpg",
  },
  {
    id: 3,
    title: "Premium Comfort",
    description:
      "Ergonomic seating, refined climate control, and unmatched legroom. We prioritize your well-being with meticulously maintained fleets so you can arrive relaxed, refreshed, and ready.",
    icon: Bus,
    image: "/premium-comfort.jpg",
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="features"
      className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 relative z-20 overflow-clip transition-colors duration-300"
      ref={containerRef}
    >
      {/* Background abstract gradients and textures */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-96 md:h-[500px] bg-gradient-to-b from-zinc-200/50 dark:from-zinc-900/30 to-transparent pointer-events-none" />
      <div className="absolute -right-1/4 top-1/4 w-full max-w-[800px] aspect-square bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative w-full">
          {/* Sticky Left Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit z-10 w-full mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-sm"
            >
              Our Standards
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-zinc-900 dark:text-white tracking-tight leading-[1.05]"
            >
              Built for <br />
              <span className="text-zinc-500 dark:text-zinc-600">Excellence.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-lg"
            >
              We redefine the standards of group travel. By combining premium comfort, widespread nationwide coverage,
              and budget-friendly pricing, we deliver an unmatched experience from start to finish.
            </motion.p>

            {/* Desktop Navigation/Indicator elements */}
            <div className="hidden lg:flex flex-col gap-6 mt-16 origin-left opacity-80">
              {features.map((f, i) => (
                <div
                  key={f.id}
                  className="flex items-center gap-6 text-zinc-400 dark:text-zinc-600 font-heading font-bold text-sm tracking-widest uppercase"
                >
                  <span className="text-xs">0{i + 1}</span>
                  <div className="w-16 h-px bg-zinc-300 dark:bg-zinc-800" />
                  {f.title}
                </div>
              ))}
            </div>
          </div>

          {/* Right Scrolling Content (Large Cards) */}
          <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-12 w-full relative z-20 pb-12 lg:pb-32">
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the image inside the card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full sticky flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group origin-top`}
      style={{ top: `calc(80px + ${index * 40}px)`, zIndex: index + 10 }} // Stacking effect
    >
      {/* Top Section with Content */}
      <div className="p-8 sm:p-10 lg:p-12 flex flex-col gap-8 w-full shrink-0">
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:items-center justify-between w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shrink-0">
            <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
          </div>

          <span className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black text-zinc-100 dark:text-zinc-900/50 group-hover:text-zinc-200 dark:group-hover:text-zinc-800 transition-colors duration-500 tracking-tighter">
            0{index + 1}
          </span>
        </div>

        <div className="flex flex-col w-full">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4 tracking-tight transition-colors duration-500">
            {feature.title}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Bottom Section with Image */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden shrink-0 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900">
        <motion.div style={{ y: imgY }} className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[1.5s] ease-out origin-center"
          />
        </motion.div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none transition-colors duration-500 group-hover:bg-transparent" />
      </div>
    </motion.div>
  );
}
