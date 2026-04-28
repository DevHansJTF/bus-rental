"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Bus } from "@/lib/data";

interface BookingData {
  passengers: string;
  location: string;
  dates: string;
}

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  targetBusId: number | null;
  setTargetBusId: (id: number | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedBusForBooking: Bus | null;
  setSelectedBusForBooking: (bus: Bus | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({
    passengers: "",
    location: "",
    dates: "",
  });
  const [targetBusId, setTargetBusId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusForBooking, setSelectedBusForBooking] = useState<Bus | null>(null);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        targetBusId,
        setTargetBusId,
        isModalOpen,
        setIsModalOpen,
        selectedBusForBooking,
        setSelectedBusForBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
