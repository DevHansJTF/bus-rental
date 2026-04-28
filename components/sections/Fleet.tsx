"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Settings, Users, Wind, ArrowRight, ArrowLeft, X, Check, CheckCircle2 } from "lucide-react";
import { fleetData } from "@/lib/data";
import { useBooking } from "@/lib/BookingContext";

export function Fleet() {
  const { targetBusId, setTargetBusId, setIsModalOpen, setSelectedBusForBooking } = useBooking();
  const [isWeekly, setIsWeekly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [selectedBus, setSelectedBus] = useState<(typeof fleetData)[0] | null>(null);

  // Handle deep link from Hero
  useEffect(() => {
    if (targetBusId) {
      const busIndex = fleetData.findIndex((b) => b.id === targetBusId);
      if (busIndex !== -1) {
        // Calculate direction and set index
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDirection(busIndex > currentIndex ? 1 : -1);
        setCurrentIndex(busIndex);
        setSelectedBus(fleetData[busIndex]);
        // Reset target so it doesn't trigger again
        setTargetBusId(null);
      }
    }
  }, [targetBusId, currentIndex, setTargetBusId]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  };

  const getCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const position = currentIndex + i;
      const idx = ((position % fleetData.length) + fleetData.length) % fleetData.length;
      cards.push({ ...fleetData[idx], offset: i, uniqueKey: `${idx}-${position}` });
    }
    return cards;
  };

  const handleBookNow = (bus?: (typeof fleetData)[0]) => {
    const busToBook = bus || selectedBus;
    if (busToBook) {
      setSelectedBusForBooking(busToBook);
      setSelectedBus(null);
      setIsModalOpen(true);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedBus]);

  return (
    <section
      id="fleet"
      className="py-24 bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4"
          >
            Choose your desired bus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg px-4"
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
          <div className="flex justify-end gap-3 mb-10 pr-4 relative z-20">
            <button
              onClick={prevSlide}
              className="group relative w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:ring-offset-2 dark:focus:ring-white/10"
              aria-label="Previous bus"
            >
              <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full"></div>
              <ArrowLeft
                className="w-5 h-5 text-zinc-900 dark:text-white relative z-10 group-hover:-translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={nextSlide}
              className="group relative w-14 h-14 rounded-full border border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center overflow-hidden transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:ring-offset-2 dark:focus:ring-white/10"
              aria-label="Next bus"
            >
              <div className="absolute inset-0 bg-white dark:bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full"></div>
              <ArrowRight
                className="w-5 h-5 text-white dark:text-zinc-900 group-hover:text-zinc-900 dark:group-hover:text-white relative z-10 group-hover:translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Cards Container */}
          <div className="w-full overflow-hidden pb-12">
            <div className="flex justify-center items-center gap-6 w-full mx-auto min-h-[500px]">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                {getCards().map((bus) => {
                  const isActive = bus.offset === 0;

                  return (
                    <motion.div
                      layout
                      key={bus.uniqueKey}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          opacity: 0,
                          scale: 0.85,
                          x: d > 0 ? 100 : -100,
                        }),
                        exit: (d: number) => ({
                          opacity: 0,
                          scale: 0.85,
                          x: d > 0 ? -100 : 100,
                        }),
                      }}
                      initial="enter"
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        scale: isActive ? 1 : 0.85,
                        x: 0,
                        zIndex: isActive ? 10 : 1,
                      }}
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className={`bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border transition-colors duration-400 w-full max-w-sm shrink-0 ${isActive ? "border-zinc-200 dark:border-zinc-700 shadow-2xl shadow-black/5 dark:shadow-black/40 ring-1 ring-zinc-900/5 dark:ring-white/5" : "border-zinc-100 dark:border-zinc-800 shadow-sm pointer-events-none"}`}
                    >
                      {/* Image Area */}
                      <div
                        className="relative h-56 bg-zinc-50 dark:bg-zinc-950 overflow-hidden group cursor-pointer"
                        onClick={() => isActive && setSelectedBus(bus)}
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={bus.image}
                            alt={bus.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 flex items-center justify-between w-full">
                            <div>
                              <p className="font-bold tracking-wide">Quick View</p>
                              <p className="text-sm text-zinc-200 line-clamp-1">
                                {bus.description || "Premium seating, onboard entertainment."}
                              </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
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

                        <button
                          onClick={() => handleBookNow(bus)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white hover:bg-zinc-900 dark:hover:bg-white text-zinc-900 dark:text-white hover:text-white dark:hover:text-zinc-900 font-bold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md"
                        >
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
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedBus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedBus(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedBus(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto shrink-0 bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={selectedBus.image}
                  alt={selectedBus.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 sm:p-8 md:p-12 flex flex-col justify-center overflow-y-auto w-full"
              >
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                    <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    Available Now
                  </div>
                  <h3 className="font-heading font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight mb-2">
                    {selectedBus.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-base sm:text-lg">
                    {selectedBus.type}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 sm:mb-8">
                  {selectedBus.description} This vehicle is meticulously maintained and features premium amenities
                  ensuring a comfortable journey for your entire group.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 mb-8 sm:mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Capacity</p>
                      <p className="font-bold text-zinc-900 dark:text-white">{selectedBus.specs.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                      <Wind className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Climate Control</p>
                      <p className="font-bold text-zinc-900 dark:text-white">{selectedBus.specs.ac}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Transmission</p>
                      <p className="font-bold text-zinc-900 dark:text-white">{selectedBus.specs.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Entertainment</p>
                      <p className="font-bold text-zinc-900 dark:text-white">Included</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                  <div className="w-full sm:w-auto text-center sm:text-left mr-auto">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Starting from</p>
                    <p className="font-heading font-bold text-3xl text-zinc-900 dark:text-white">
                      &#8369;{selectedBus.dailyPrice.toLocaleString()}{" "}
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">/day</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleBookNow(selectedBus)}
                    className="w-full sm:w-auto bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Proceed to Booking
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
