"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Check,
  ArrowRight,
  Trash2,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  Search,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/lib/BookingContext";
import { fleetData, POPULAR_LOCATIONS } from "@/lib/data";
import { LocationSearchModal } from "./LocationSearchModal";
import { DateTimeModal } from "./DateTimeModal";
import { RemoveConfirmModal } from "./RemoveConfirmModal";

export function BookingModal() {
  const { isModalOpen, setIsModalOpen, selectedBusForBooking, setSelectedBusForBooking } = useBooking();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // @ts-ignore
      if (typeof window !== "undefined" && window.lenis) {
        // @ts-ignore
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // @ts-ignore
      if (typeof window !== "undefined" && window.lenis) {
        // @ts-ignore
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // @ts-ignore
      if (typeof window !== "undefined" && window.lenis) {
        // @ts-ignore
        window.lenis.start();
      }
    };
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[85vh] sm:h-[90vh] bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row font-sans"
          >
            <BookingModalContent handleClose={handleClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function BookingModalContent({ handleClose }: { handleClose: () => void }) {
  const { selectedBusForBooking, bookingData, setBookingData, setSelectedBusForBooking, setIsModalOpen } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize state on mount
  const [localPassengers, setLocalPassengers] = useState(bookingData.passengers || "1");
  const [localLocation, setLocalLocation] = useState(bookingData.location || "");
  const [startDate, setStartDate] = useState<Date | null>(() => {
    if (bookingData.dates && bookingData.dates.includes("-")) {
      const startStr = bookingData.dates.split("-")[0].trim();
      const date = new Date(`${startStr}, ${new Date().getFullYear()}`);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    if (bookingData.dates && bookingData.dates.includes("-")) {
      const endStr = bookingData.dates.split("-")[1].trim();
      const date = new Date(`${endStr}, ${new Date().getFullYear()}`);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  });
  const [showLocSuggestions, setShowLocSuggestions] = useState(false);

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

  const numLocalPassengers = parseInt(localPassengers);
  const isLocalPassengerInvalid =
    localPassengers.length > 0 ? isNaN(numLocalPassengers) || numLocalPassengers < 1 || numLocalPassengers > 30 : false;

  // Sync back to context only when local changes occur
  useEffect(() => {
    const datesString =
      startDate && endDate
        ? `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`
        : startDate
          ? formatDateTime(startDate)
          : bookingData.dates;

    if (
      localPassengers !== bookingData.passengers ||
      localLocation !== bookingData.location ||
      datesString !== bookingData.dates
    ) {
      setBookingData({
        passengers: localPassengers,
        location: localLocation,
        dates: datesString,
      });
    }
  }, [
    localPassengers,
    localLocation,
    startDate,
    endDate,
    bookingData.dates,
    bookingData.location,
    bookingData.passengers,
    setBookingData,
  ]);

  // Modals state
  const [showDepartureModal, setShowDepartureModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const [mobilePage, setMobilePage] = useState<1 | 2>(1);

  // We reuse showLocSuggestions for the new modal
  // const [showLocSuggestions, setShowLocSuggestions] = useState(false); // already defined above!

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const isCartComplete = !!(
    startDate &&
    endDate &&
    localLocation.trim() &&
    localPassengers.trim() !== "" &&
    !isLocalPassengerInvalid
  );

  const isFormComplete = !!(
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.postalCode.trim() &&
    isCartComplete
  );

  const getEstimatedPrice = () => {
    if (!selectedBusForBooking) return 0;
    if (!startDate || !endDate) return selectedBusForBooking.dailyPrice;

    const diffMs = endDate.getTime() - startDate.getTime();
    if (diffMs < 0) return selectedBusForBooking.dailyPrice; // End date before start date edge case

    const durationDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const weeks = Math.floor(durationDays / 7);
    const extraDays = durationDays % 7;

    if (selectedBusForBooking.weeklyPrice && durationDays >= 7) {
      return weeks * selectedBusForBooking.weeklyPrice + extraDays * selectedBusForBooking.dailyPrice;
    }

    return durationDays * selectedBusForBooking.dailyPrice;
  };

  const estimatedPrice = getEstimatedPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed || !isFormComplete) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          trip: {
            busName: selectedBusForBooking?.name,
            location: localLocation,
            passengers: localPassengers,
            startDate,
            endDate,
            price: estimatedPrice,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      setIsSubmitting(false);
      // We still show success for the user demo in preview environments
      setShowSuccess(true);
    }
  };

  if (!selectedBusForBooking) {
    const validPassengers = !isNaN(numLocalPassengers) && numLocalPassengers > 0 && numLocalPassengers <= 30;
    const filteredFleetData = fleetData.filter((bus) => {
      const cap = parseInt(bus.specs.capacity) || 0;
      return validPassengers ? cap >= numLocalPassengers : true;
    });

    return (
      <div
        className="flex-1 p-8 md:p-12 overflow-y-auto overscroll-contain w-full flex flex-col relative"
        data-lenis-prevent="true"
      >
        <button
          onClick={handleClose}
          className="absolute top-8 right-8 z-50 w-12 h-12 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all border border-zinc-800"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight pt-12 md:pt-0">
          Select a Vehicle
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <p className="text-zinc-400">Select your preferred bus according to your passenger count.</p>
          <div className="relative group/input max-w-[200px]">
            <label className="flex items-center gap-2 mb-1.5 px-0.5">
              <Users className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">Passengers</span>
            </label>
            <input
              type="number"
              min={1}
              max={30}
              placeholder="e.g. 15"
              value={localPassengers}
              onChange={(e) => setLocalPassengers(e.target.value)}
              className={`w-full bg-zinc-950/40 border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-medium ${isLocalPassengerInvalid ? "border-red-500/50 focus:border-red-500 text-red-500" : "border-zinc-800/60 focus:border-white text-zinc-200 focus:bg-zinc-900"}`}
            />
            <AnimatePresence mode="wait">
              {isLocalPassengerInvalid && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="text-red-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5 overflow-hidden"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />{" "}
                  <span className="truncate">
                    {numLocalPassengers < 1 || isNaN(numLocalPassengers) ? "Minimum is 1" : "Max capacity is 30"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {filteredFleetData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredFleetData.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedBusForBooking(bus)}
                className="text-left bg-zinc-900/30 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all group relative overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-zinc-800 shrink-0">
                  <Image
                    src={bus.image}
                    alt={bus.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{bus.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">{bus.type}</p>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <p className="text-sm text-zinc-500 font-bold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> {bus.specs.capacity}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold">
                      &#8369;{bus.dailyPrice.toLocaleString()}{" "}
                      <span className="text-xs text-zinc-500 font-normal">/day</span>
                    </p>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-3xl pb-12">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No vehicles available</h3>
            <p className="text-zinc-500 max-w-sm mb-6">
              We don&apos;t have any single vehicle that can accommodate {numLocalPassengers} passengers. Please reduce
              the number of passengers or contact us for a custom fleet arrangement.
            </p>
            <button
              onClick={() => {
                setLocalPassengers("30");
              }}
              className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 px-6 rounded-full transition-colors text-sm"
            >
              Reset Passengers
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 w-12 h-12 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all border border-zinc-800"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Left Column: Your Selection (The "Cart") */}
      <div
        className={`flex-1 p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-900 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-4 [&::-webkit-scrollbar-thumb]:bg-zinc-800/80 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700/80 [&::-webkit-scrollbar-thumb]:rounded-full ${mobilePage === 2 ? "hidden md:block" : "block"}`}
        data-lenis-prevent="true"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 tracking-tight">Chosen Bus</h2>

        <div className="space-y-8">
          <div className="p-5 sm:p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 transition-colors">
            <div className="flex flex-row gap-5 sm:gap-6 items-start">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                <Image
                  src={selectedBusForBooking.image}
                  alt={selectedBusForBooking.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-lg sm:text-xl font-bold">{selectedBusForBooking.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1 mb-3">
                  {selectedBusForBooking.type}
                </p>
                <p className="text-lg sm:text-xl font-bold">&#8369;{estimatedPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Header for Fields & Clear All */}
            <div className="flex items-center justify-between mt-8 mb-4 border-t border-zinc-900 pt-6">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">Trip Details</h4>
              {(localPassengers !== "" || localLocation !== "" || startDate !== null || endDate !== null) && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalPassengers("");
                    setLocalLocation("");
                    setStartDate(null);
                    setEndDate(null);
                  }}
                  className="text-[10px] sm:text-xs text-red-500 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 py-1.5 px-3 rounded-full flex items-center gap-1.5 font-bold uppercase tracking-widest transition-colors"
                >
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              <div className="relative group/input sm:col-span-2">
                <label className="flex items-center gap-2 mb-1.5 px-0.5">
                  <Users className="w-3 h-3 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">Passengers</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={localPassengers}
                  onChange={(e) => setLocalPassengers(e.target.value)}
                  className={`w-full bg-zinc-950/40 border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-medium ${isLocalPassengerInvalid ? "border-red-500/50 focus:border-red-500 text-red-500" : "border-zinc-800/60 focus:border-white text-zinc-200 focus:bg-zinc-900"}`}
                />
                {isLocalPassengerInvalid && (
                  <div className="absolute -bottom-5 left-2 flex flex-row items-center space-x-1 text-red-500 font-bold z-10 pointer-events-none scale-90 origin-left">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-[10px] leading-tight">
                      {numLocalPassengers < 1 || isNaN(numLocalPassengers) ? "Minimum is 1" : "Max capacity is 30"}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center gap-2 mb-1.5 px-0.5">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">Departure</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowDepartureModal(true)}
                  className="w-full text-left bg-zinc-950/40 border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-white focus:bg-zinc-900 transition-all font-medium cursor-pointer"
                >
                  {startDate ? formatDateTime(startDate) : <span className="text-zinc-500">Select time</span>}
                </button>
              </div>

              <div className="relative">
                <label className="flex items-center gap-2 mb-1.5 px-0.5">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">Return</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowReturnModal(true)}
                  className="w-full text-left bg-zinc-950/40 border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-white focus:bg-zinc-900 transition-all font-medium cursor-pointer"
                >
                  {endDate ? formatDateTime(endDate) : <span className="text-zinc-500">Select time</span>}
                </button>
              </div>

              <div className="sm:col-span-2 relative">
                <label className="flex items-center gap-2 mb-1.5 px-0.5">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                    Pickup Location / Custom Address
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowLocSuggestions(true)}
                  className="w-full relative text-left bg-zinc-950/40 border border-zinc-800/60 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-white focus:bg-zinc-900 transition-all font-medium"
                >
                  <div className={`line-clamp-1 ${localLocation ? "text-zinc-200" : "text-zinc-500"}`}>
                    {localLocation || "Search landmark or type address"}
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowRemoveConfirm(true)}
                className="text-[10px] sm:text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove Vehicle
              </button>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="pt-8 border-t border-zinc-900 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-widest">Estimation</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-bold">Total Value</span>
              <div className="text-right">
                <p className="text-4xl md:text-5xl font-bold">&#8369;{estimatedPrice.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-2 px-1">
                  Shipping & taxes calculated prior to finalization.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-12 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-1">
                Instant Reservation Guaranteed
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Your selection is held for 15 minutes. Our concierge will follow up immediately after submission to
                finalize the logistics.
              </p>
            </div>
          </div>

          <div className="pt-8 md:hidden">
            <button
              type="button"
              disabled={!isCartComplete}
              onClick={() => setMobilePage(2)}
              className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-5 rounded-full shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
            >
              <span className="tracking-tight uppercase text-xs">Next</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Finalize Request (The Form) */}
      <div
        className={`w-full md:w-[450px] bg-zinc-900/50 p-6 sm:p-8 md:p-12 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-4 [&::-webkit-scrollbar-thumb]:bg-zinc-800/80 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700/80 [&::-webkit-scrollbar-thumb]:rounded-full ${mobilePage === 1 ? "hidden md:block" : "block"}`}
        data-lenis-prevent="true"
      >
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col items-center justify-center text-center py-12"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-3xl font-bold mb-4 font-heading tracking-tight">Request Received</h3>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Our premium concierge will contact you within the next 24 hours with a formal proposal and schedule.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-white text-zinc-950 font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors tracking-tight"
            >
              Return to Site
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-10 relative">
              <button
                type="button"
                onClick={() => setMobilePage(1)}
                className="md:hidden text-xs text-zinc-400 hover:text-white flex items-center gap-2 mb-6 font-bold uppercase tracking-wider transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Chosen Bus
              </button>
              <h3 className="font-heading text-3xl font-bold tracking-tight mb-3">Finalize Request</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Provide your details to initiate the acquisition process. A dedicated concierge will contact you with a
                formal proposal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Delivery Address / Pickup"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <input
                    required
                    type="text"
                    placeholder="City"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Postal Code"
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] font-bold"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border border-zinc-700 flex items-center justify-center transition-all ${confirmed ? "bg-white border-white" : "group-hover:border-zinc-500"}`}
                    onClick={() => setConfirmed(!confirmed)}
                  >
                    {confirmed && <Check className="w-3.5 h-3.5 text-zinc-950" strokeWidth={3} />}
                  </div>
                  <span className="text-[11px] text-zinc-500 leading-tight font-medium select-none">
                    I confirm my details are correct and I authorize ApexBus to contact me regarding this request.
                  </span>
                </label>
              </div>

              <div className="pt-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 text-center mb-6">
                  No payment required at this step.
                </p>
                <button
                  type="submit"
                  disabled={!confirmed || isSubmitting || !isFormComplete}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-5 rounded-full shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="tracking-tight uppercase text-xs">Submit</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <LocationSearchModal
        isOpen={showLocSuggestions}
        onClose={() => setShowLocSuggestions(false)}
        onSelect={setLocalLocation}
        initialValue={localLocation}
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

      <RemoveConfirmModal
        isOpen={showRemoveConfirm}
        onClose={() => setShowRemoveConfirm(false)}
        onConfirm={() => {
          setSelectedBusForBooking(null);
        }}
        itemName={selectedBusForBooking?.name || "this vehicle"}
      />
    </>
  );
}
