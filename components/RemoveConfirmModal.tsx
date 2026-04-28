"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, Trash2 } from "lucide-react";
import { ClientPortal } from "./ClientPortal";

interface RemoveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export function RemoveConfirmModal({ isOpen, onClose, onConfirm, itemName }: RemoveConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ClientPortal>
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 dark:bg-black/80"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>

              <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Remove Vehicle?</h3>

              <p className="text-zinc-500 text-sm mb-8">
                Are you sure you want to remove{" "}
                <span className="font-bold text-zinc-900 dark:text-zinc-300">{itemName}</span> from your booking? This
                action cannot be undone.
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm tracking-wide bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  KEEP IT
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-bold text-sm tracking-wide hover:bg-red-600 transition-colors shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] border border-red-400"
                >
                  REMOVE
                </button>
              </div>
            </motion.div>
          </div>
        </ClientPortal>
      )}
    </AnimatePresence>
  );
}
