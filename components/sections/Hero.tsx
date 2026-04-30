"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Star,
  AlertCircle,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { fleetData, POPULAR_LOCATIONS } from "@/lib/data";
import { useBooking } from "@/lib/BookingContext";
import { LocationSearchModal } from "../LocationSearchModal";
import { DateTimeModal } from "../DateTimeModal";

export function Hero() {
  const ref = useRef(null);
  const { setBookingData, setTargetBusId, setIsModalOpen, setSelectedBusForBooking } = useBooking();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [0.3, 0]);

  const [passengers, setPassengers] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [activeInput, setActiveInput] = useState<"departure" | "return" | null>(null);

  const formatDateTime = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const datesString =
    startDate && endDate
      ? `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`
      : startDate
        ? formatDateTime(startDate)
        : "";

  // Sync with context
  useEffect(() => {
    setBookingData({ passengers, location, dates: datesString });
  }, [passengers, location, datesString, setBookingData]);

  // Modals state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDepartureModal, setShowDepartureModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Derived state to determine the recommended bus
  const numPassengers = parseInt(passengers);
  const isPassengerInvalid =
    passengers.length > 0 ? isNaN(numPassengers) || numPassengers < 1 || numPassengers > 30 : false;

  const filledCount = (passengers ? 1 : 0) + (location ? 1 : 0) + (startDate ? 1 : 0) + (endDate ? 1 : 0);

  const recommendedBus =
    !isNaN(numPassengers) && numPassengers > 0 && numPassengers <= 30
      ? fleetData.find((b) => {
          if (numPassengers <= 10) return b.id === 1;
          if (numPassengers <= 15) return b.id === 3;
          return b.id === 2;
        }) || fleetData[0]
      : fleetData[1]; // Default to Metro Oxford

  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRecommendationAction = () => {
    if (passengers && location && startDate && endDate && !isPassengerInvalid) {
      setSelectedBusForBooking(recommendedBus);
      setIsModalOpen(true);
    } else {
      setTargetBusId(recommendedBus.id);
      scrollToFleet();
    }
  };

  const handleGetAQuote = () => {
    setSelectedBusForBooking(null);
    setIsModalOpen(true);
  };

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
      <div className="absolute inset-x-0 top-0 h-[60vh] lg:h-[75vh] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0 transform-gpu origin-top">
          <Image
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2938&auto=format&fit=crop"
            alt="Premium comfortable bus interior"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-white/60 dark:bg-black/60 transition-colors"
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-zinc-50/80 dark:via-zinc-950/80 to-transparent transition-colors"></div>
      </div>

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
              className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 transition-colors"
            >
              Elevate your <br className="hidden sm:block" />
              <span className="text-zinc-800 font-semibold dark:text-zinc-400 transition-colors">group journey.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 max-w-xl leading-relaxed transition-colors"
            >
              Experience ultimate comfort and reliability with our modern fleet. Perfect for corporate events, tours,
              and private group travel.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToFleet}
                className="w-full sm:w-auto justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-xl hover:shadow-2xl hover:bg-zinc-800 dark:hover:bg-white inline-flex items-center gap-2 group"
              >
                View Our Fleet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={handleGetAQuote}
                className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-zinc-900 dark:text-white bg-zinc-200/50 dark:bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 transition-colors inline-flex items-center gap-2"
              >
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
            className="lg:col-span-5 w-full mt-6 sm:mt-10 lg:mt-0"
          >
            <div
              id="booking-console"
              className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-black/20 relative overflow-hidden group transition-colors"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Reserve Now
                </h3>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Live Rates
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative group/input">
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isPassengerInvalid ? "text-red-500" : "text-zinc-500 dark:text-zinc-400 group-focus-within/input:text-zinc-900 dark:group-focus-within/input:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"}`}
                    >
                      <Users className="w-5 h-5" />
                    </div>
                    <label className="absolute left-12 top-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                      Passengers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      placeholder="Total Persons"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className={`w-full bg-zinc-50 dark:bg-zinc-950 border hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl sm:rounded-2xl pt-6 pb-2.5 pl-12 pr-10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-sm focus:outline-none focus:ring-2 transition-all ${isPassengerInvalid ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100"}`}
                    />
                    {passengers && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full p-1.5 transition-all z-20"
                        onClick={() => setPassengers("")}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="relative group/input">
                    <button
                      type="button"
                      onClick={() => setShowLocationModal(true)}
                      className="w-full relative text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl sm:rounded-2xl pt-6 pb-2.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100"
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors z-10 pointer-events-none">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <label className="absolute left-12 top-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400 z-10 pointer-events-none">
                        Pickup
                      </label>
                      <div
                        className={`text-sm font-medium line-clamp-1 ${location ? "text-zinc-900 dark:text-zinc-100 pr-6" : "text-zinc-300 dark:text-zinc-700"}`}
                      >
                        {location || "Enter Landmark"}
                      </div>
                      {location && (
                        <div
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full p-1.5 transition-all z-20 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation("");
                          }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isPassengerInvalid && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-[11px] font-bold uppercase tracking-wide flex items-center gap-2 overflow-hidden px-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {numPassengers < 1 || isNaN(numPassengers) ? "Minimum is 1" : "Max capacity is 30"}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative group/input">
                    <button
                      type="button"
                      onClick={() => setShowDepartureModal(true)}
                      className="w-full relative text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl sm:rounded-2xl pt-6 pb-2.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100"
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors z-10 pointer-events-none">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <label className="absolute left-12 top-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400 z-10 pointer-events-none">
                        Departure
                      </label>
                      <div
                        className={`text-sm font-medium line-clamp-1 ${startDate ? "text-zinc-900 dark:text-zinc-100 pr-6" : "text-zinc-300 dark:text-zinc-700"}`}
                      >
                        {startDate ? formatDateTime(startDate) : "Select time"}
                      </div>
                      {startDate && (
                        <div
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full p-1.5 transition-all z-20 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStartDate(null);
                          }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="relative group/input">
                    <button
                      type="button"
                      onClick={() => setShowReturnModal(true)}
                      className="w-full relative text-left bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl sm:rounded-2xl pt-6 pb-2.5 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100"
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors z-10 pointer-events-none">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <label className="absolute left-12 top-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400 z-10 pointer-events-none">
                        Return
                      </label>
                      <div
                        className={`text-sm font-medium line-clamp-1 ${endDate ? "text-zinc-900 dark:text-zinc-100 pr-6" : "text-zinc-300 dark:text-zinc-700"}`}
                      >
                        {endDate ? formatDateTime(endDate) : "Select time"}
                      </div>
                      {endDate && (
                        <div
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full p-1.5 transition-all z-20 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEndDate(null);
                          }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {filledCount >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="flex justify-end overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setPassengers("");
                          setLocation("");
                          setStartDate(null);
                          setEndDate(null);
                        }}
                        className="text-[10px] uppercase font-bold tracking-widest text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 py-1.5 pl-2.5 pr-3 rounded-full flex items-center gap-1.5 transition-all"
                      >
                        <X className="w-3 h-3" /> Clear All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {passengers && !isPassengerInvalid ? (
                    <motion.div
                      key="recommendation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mt-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 relative group/card cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all origin-top overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-bl-xl shadow-sm z-10">
                        Recommended match
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 group-hover/card:scale-105 transition-transform duration-500">
                          <Image
                            src={recommendedBus.image}
                            alt={recommendedBus.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading font-bold text-zinc-900 dark:text-zinc-50 text-base line-clamp-1">
                            {recommendedBus.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                            {recommendedBus.specs.capacity}
                          </p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Availability
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            &#8369;{recommendedBus.dailyPrice.toLocaleString()}
                          </p>
                          <p className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                            / day
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onTouchStart={() => {
                          handleRecommendationAction();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleRecommendationAction();
                        }}
                        className="w-full relative z-10 mt-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-bold py-3.5 rounded-xl text-sm transition-colors shadow-md hover:shadow-lg"
                      >
                        {passengers && location && startDate && endDate ? "Book Now" : "Check Availability"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mt-6 origin-top overflow-hidden"
                    >
                      <button
                        type="button"
                        disabled={isPassengerInvalid}
                        onTouchStart={() => {
                          if (!isPassengerInvalid) scrollToFleet();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToFleet();
                        }}
                        className="w-full relative z-10 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-xl text-sm transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0"
                      >
                        Search Available Vehicles
                        {!isPassengerInvalid && (
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Best price guaranteed
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <LocationSearchModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={setLocation}
        initialValue={location}
      />

      <DateTimeModal
        isOpen={showDepartureModal}
        onClose={() => setShowDepartureModal(false)}
        onSelect={(date) => {
          setStartDate(date);
          if (endDate && date >= endDate) {
            setEndDate(null);
          }
        }}
        initialDate={startDate}
        title="Select Departure"
      />

      <DateTimeModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        onSelect={setEndDate}
        initialDate={endDate}
        minDate={startDate || undefined}
        title="Select Return"
      />
    </section>
  );
}
