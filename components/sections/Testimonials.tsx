"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

const reviews = [
  {
    text: "The city sprinter made our corporate retreat seamless. Incredible amenities and pristine condition inside out.",
    name: "Alex Rivera",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    text: "Mabait ang may-ari at napakadaling kausap. Sobrang comfortable pa sa bus. 10/10! Will definitely book again.",
    name: "Eva Elfie",
    role: "Actress",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    text: "Punctual, professional, and affordable. We used OmniBus for a week-long nationwide tour and had absolutely zero issues.",
    name: "Marcus Johnson",
    role: "Tour Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

export function Testimonials() {
  // Duplicate reviews for seamless infinite scroll
  const marqueeReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-6"
        >
          Customer Feedback
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight"
        >
          Loved by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">everyone.</span>
        </motion.h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group/marquee">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

        <div className="flex w-max animate-marquee gap-8 px-4 group-hover/marquee:[animation-play-state:paused]">
          {marqueeReviews.map((review, index) => (
            <div
              key={index}
              className="w-[400px] shrink-0 backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col relative overflow-hidden transition-all duration-500 hover:bg-white/10"
            >
              <div className="text-blue-500/40 mb-6">
                <Quote className="w-12 h-12 fill-current" />
              </div>

              <p className="text-slate-300 flex-grow mb-10 text-lg font-medium leading-relaxed">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/10">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">{review.name}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
