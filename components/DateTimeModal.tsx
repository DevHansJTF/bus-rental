import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Clock, X, ChevronRight, ChevronLeft } from "lucide-react";
import { ClientPortal } from "./ClientPortal";
import DatePicker from "react-datepicker";

interface DateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  initialDate: Date | null;
  minDate?: Date;
  title: string;
}

export function DateTimeModal({ isOpen, onClose, onSelect, initialDate, minDate, title }: DateTimeModalProps) {
  const [step, setStep] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        setStep("date");
        setSelectedDate(initialDate);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, initialDate]);

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      // Keep existing time if we had one
      if (selectedDate) {
        date.setHours(selectedDate.getHours());
        date.setMinutes(selectedDate.getMinutes());
      } else {
        date.setHours(12, 0, 0, 0); // default noon
      }
      setSelectedDate(date);
      setStep("time");
    } else {
      setSelectedDate(null);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const minTimeDate = minDate || new Date();

    const isSameDayAsMin =
      selectedDate &&
      selectedDate.getDate() === minTimeDate.getDate() &&
      selectedDate.getMonth() === minTimeDate.getMonth() &&
      selectedDate.getFullYear() === minTimeDate.getFullYear();

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (isSameDayAsMin) {
          // If the hour has already passed, skip
          if (h < minTimeDate.getHours()) {
            continue;
          }
          // If we are at the current hour, check minutes
          if (h === minTimeDate.getHours() && m <= minTimeDate.getMinutes()) {
            continue;
          }
        }
        slots.push({ hours: h, minutes: m });
      }
    }
    return slots;
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    if (selectedDate) {
      const finalDate = new Date(selectedDate);
      finalDate.setHours(hours, minutes, 0, 0);
      onSelect(finalDate);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ClientPortal>
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Steps Config */}
                <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1">
                  <button
                    onClick={() => setStep("date")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${step === "date" ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" /> Date
                  </button>
                  <button
                    onClick={() => selectedDate && setStep("time")}
                    disabled={!selectedDate}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${step === "time" ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-800 font-semibold"} ${!selectedDate && "opacity-50 cursor-not-allowed"}`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Time
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 relative">
                <AnimatePresence mode="wait">
                  {step === "date" ? (
                    <motion.div
                      key="date"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex justify-center"
                    >
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        minDate={minDate || new Date()}
                        inline
                        calendarClassName="!border-none !bg-transparent custom-modal-calendar"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="time"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="h-[300px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar"
                      data-lenis-prevent="true"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {generateTimeSlots().map((slot, i) => {
                          const dateObj = new Date();
                          dateObj.setHours(slot.hours, slot.minutes);
                          const formattedTime = dateObj.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                          return (
                            <button
                              key={i}
                              onClick={() => handleTimeSelect(slot.hours, slot.minutes)}
                              className="py-3 px-2 rounded-xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                              {formattedTime}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </ClientPortal>
      )}
    </AnimatePresence>
  );
}
