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
import { POPULAR_LOCATIONS } from "@/lib/data";
import { LocationSearchModal } from "./LocationSearchModal";
import { DateTimeModal } from "./DateTimeModal";
import { RemoveConfirmModal } from "./RemoveConfirmModal";

export function BookingModal() {
  const { isModalOpen, setIsModalOpen, selectedBusForBooking, setSelectedBusForBooking } = useBooking();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && selectedBusForBooking && (
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
            className="relative w-full max-w-6xl h-[90vh] bg-zinc-950 text-white rounded-[2rem] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row"
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
    localPassengers.length > 0 && (isNaN(numLocalPassengers) || numLocalPassengers < 1 || numLocalPassengers > 30);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (!selectedBusForBooking) return null;

  return (
    <>
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 w-12 h-12 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all border border-zinc-800"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Left Column: Your Selection (The "Cart") */}
      <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-900 overflow-y-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 tracking-tight">Your Cart</h2>

        <div className="space-y-8">
          <div className="flex gap-6 items-start p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-colors group">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
              <Image
                src={selectedBusForBooking.image}
                alt={selectedBusForBooking.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{selectedBusForBooking.name}</h3>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1">
                    {selectedBusForBooking.type}
                  </p>
                </div>
                <p className="text-xl font-bold">&#8369;{selectedBusForBooking.dailyPrice.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mt-6">
                <div className="relative group/input">
                  <label className="flex items-center gap-2 mb-1.5 px-0.5">
                    <Users className="w-3 h-3 text-zinc-500" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500">Guests</span>
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
                    <div className="absolute -bottom-5 left-2 flex flex-row items-center space-x-1 text-red-500 font-bold z-10 pointer-events-none scale-90 origin-left sm:hidden">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-[10px] leading-tight">Invalid passenger count (1-30)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center pt-[16px]">
                  {isLocalPassengerInvalid && (
                    <div className="flex items-center gap-1.5 text-red-500 font-bold max-sm:hidden">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Invalid passenger count (1-30)</span>
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

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowRemoveConfirm(true)}
                  className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-2 font-bold uppercase tracking-wider transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
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
                <p className="text-4xl md:text-5xl font-bold">
                  &#8369;{selectedBusForBooking.dailyPrice.toLocaleString()}
                </p>
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
        </div>
      </div>

      {/* Right Column: Finalize Request (The Form) */}
      <div className="w-full md:w-[450px] bg-zinc-900/50 p-8 md:p-12 overflow-y-auto">
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
            <div className="mb-10">
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
                    I confirm my details are correct and I authorize OmniBus to contact me regarding this request.
                  </span>
                </label>
              </div>

              <div className="pt-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 text-center mb-6">
                  No payment required at this step.
                </p>
                <button
                  type="submit"
                  disabled={!confirmed || isSubmitting || isLocalPassengerInvalid}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-5 rounded-full shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-30 group/btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="tracking-tight uppercase text-xs">Submit Inquiry</span>
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
        onSelect={setStartDate}
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
          // If we also want to close the overall booking modal when bus is removed:
          // setIsModalOpen(false);
          // For now let's just clear the bus so user can see it's clear
          // or close since the modal is for a specific bus.
          setIsModalOpen(false);
        }}
        itemName={selectedBusForBooking?.name || "this vehicle"}
      />
    </>
  );
}
