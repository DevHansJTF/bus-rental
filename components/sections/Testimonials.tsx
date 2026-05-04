"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    text: "The city sprinter made our corporate retreat seamless. Incredible amenities and pristine condition inside out.",
    name: "Alex Rivera",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    text: "Mabait ang may-ari at napakadaling kausap. Sobrang comfortable pa sa bus. 10/10! Will definitely book again.",
    name: "Eva Elfie",
    role: "Actress",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    text: "Punctual, professional, and affordable. We used ApexBus for a week-long nationwide tour and had absolutely zero issues.",
    name: "Marcus Johnson",
    role: "Tour Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 font-semibold dark:text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
        >
          Customer Feedback
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
        >
          Loved by <span className="text-zinc-500 dark:text-zinc-400">everyone.</span>
        </motion.h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-hidden group/marquee py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-[max-content] animate-marquee">
          {[...Array(3)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex shrink-0 gap-6 md:gap-8 pl-6 md:pl-8">
              {reviews.map((review, index) => (
                <div
                  key={`${arrayIndex}-${index}`}
                  className="w-[350px] md:w-[400px] shrink-0 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-xl dark:shadow-none hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-10 h-10 fill-current text-zinc-200 dark:text-zinc-800" />
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-current" : "fill-zinc-100 dark:fill-zinc-800 text-zinc-100 dark:text-zinc-800"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 flex-grow mb-10 text-lg font-medium leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white text-base tracking-tight">
                        {review.name}
                      </h4>
                      <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
