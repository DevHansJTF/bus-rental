"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Settings, Users, Wind, ArrowRight, ArrowLeft } from "lucide-react";

const fleetData = [
  {
    id: 1,
    type: "Mini Bus",
    name: "City Sprinter",
    dailyPrice: 10000,
    weeklyPrice: 65000,
    specs: {
      transmission: "Auto",
      capacity: "10 Persons",
      ac: "Air Conditioner",
    },
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2938&auto=format&fit=crop", // Replace with real bus image if needed
  },
  {
    id: 2,
    type: "Shuttle Bus",
    name: "Metro Oxford",
    dailyPrice: 20000,
    weeklyPrice: 125000,
    specs: {
      transmission: "Auto",
      capacity: "30 Persons",
      ac: "Air Conditioner",
    },
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2938&auto=format&fit=crop",
  },
  {
    id: 3,
    type: "Mini Bus",
    name: "Transit Van",
    dailyPrice: 12000,
    weeklyPrice: 75000,
    specs: {
      transmission: "Auto",
      capacity: "15 Persons",
      ac: "Air Conditioner",
    },
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2938&auto=format&fit=crop",
  },
];

export function Fleet() {
  const [isWeekly, setIsWeekly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle item

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % fleetData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? fleetData.length - 1 : prev - 1));
  };

  return (
    <section
      id="fleet"
      className="py-24 bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4"
          >
            Choose your desired bus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg"
          >
            Find the perfect ride gracefully tailored to your needs.
          </motion.p>

          {/* Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 mt-8"
          >
            <button
              onClick={() => setIsWeekly(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isWeekly ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"}`}
            >
              Daily Rate
            </button>
            <button
              onClick={() => setIsWeekly(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isWeekly ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"}`}
            >
              Weekly Rate
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Background decorative shape */}
          <div className="absolute top-1/2 left-0 right-0 h-96 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] -translate-y-1/2 -z-10 transform -skew-y-2 border border-zinc-100 dark:border-zinc-800/50"></div>

          {/* Controls */}
          <div className="flex justify-end gap-4 mb-8 pr-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm z-20"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 flex items-center justify-center hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-sm z-20"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Cards Container */}
          <div className="flex justify-center items-center gap-6 pb-12">
            <AnimatePresence mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                let index = currentIndex + offset;
                if (index < 0) index = fleetData.length - 1;
                if (index >= fleetData.length) index = 0;

                const bus = fleetData[index];
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${bus.id}-${isActive}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, x: offset * 100 }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.85,
                      x: 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className={`bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border transition-all duration-300 w-full max-w-sm shrink-0 ${isActive ? "border-zinc-200 dark:border-zinc-700 shadow-2xl shadow-black/5 dark:shadow-black/40 ring-1 ring-zinc-900/5 dark:ring-white/5" : "border-zinc-100 dark:border-zinc-800 shadow-sm pointer-events-none"}`}
                  >
                    {/* Image Area */}
                    <div className="relative h-56 bg-zinc-50 dark:bg-zinc-950 overflow-hidden group">
                      <Image
                        src={bus.image}
                        alt={bus.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                          <p className="font-bold mb-1 tracking-wide">Quick View</p>
                          <p className="text-sm text-zinc-200">
                            Premium seating, onboard entertainment, wide panoramic windows.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-heading font-bold text-3xl text-zinc-900 dark:text-white tracking-tight">
                            {bus.name.split(" ")[0]}
                          </h3>
                          <p className="text-zinc-500 dark:text-zinc-400 font-medium">{bus.type}</p>
                        </div>
                        <div className="text-right">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={isWeekly ? "weekly" : "daily"}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="font-heading font-bold text-2xl text-zinc-900 dark:text-white"
                            >
                              &#8369;{isWeekly ? bus.weeklyPrice.toLocaleString() : bus.dailyPrice.toLocaleString()}
                            </motion.p>
                          </AnimatePresence>
                          <p className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mt-1">
                            {isWeekly ? "per week" : "per day"}
                          </p>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-4 border-t border-b border-zinc-100 dark:border-zinc-800 py-6 mb-6">
                        <div className="flex flex-col items-center text-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <Settings className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                          <span className="text-xs font-medium">{bus.specs.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 text-zinc-500 dark:text-zinc-400 border-x border-zinc-100 dark:border-zinc-800">
                          <Users className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                          <span className="text-xs font-medium">{bus.specs.capacity}</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <Wind className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                          <span className="text-xs font-medium">{bus.specs.ac}</span>
                        </div>
                      </div>

                      <button className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white hover:bg-zinc-900 dark:hover:bg-white text-zinc-900 dark:text-white hover:text-white dark:hover:text-zinc-900 font-bold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md">
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
