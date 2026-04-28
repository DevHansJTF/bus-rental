import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, X } from "lucide-react";
import { ClientPortal } from "./ClientPortal";

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  initialValue: string;
}

export function LocationSearchModal({ isOpen, onClose, onSelect, initialValue }: LocationSearchModalProps) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<Array<{ name: string; display_name: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        setQuery(initialValue);
        setResults([]);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, initialValue]);

  useEffect(() => {
    if (!isOpen) return;
    if (query.trim().length <= 2) {
      const t = setTimeout(() => setResults([]), 0);
      return () => clearTimeout(t);
    }

    const t = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=ph&format=json&limit=6&addressdetails=1`,
        );
        if (res.ok) {
          const data = await res.json();
          setResults(
            data.map((item: { name?: string; display_name: string }) => ({
              name: item.name || item.display_name.split(",")[0],
              display_name: item.display_name,
            })),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [query, isOpen]);

  const handleClose = () => {
    if (query.trim() === "" && initialValue !== "") {
      onSelect("");
    }
    onClose();
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
              onClick={handleClose}
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "80vh" }}
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 shrink-0 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSelect(query.trim());
                        onClose();
                      } else if (e.key === "Escape") {
                        handleClose();
                      }
                    }}
                    placeholder="Search destination or address..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="w-12 h-12 flex shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="p-4 overflow-y-auto flex-1 h-[400px]">
                {query.trim().length > 0 && (
                  <button
                    onClick={() => {
                      onSelect(query.trim());
                      onClose();
                    }}
                    className="w-full text-left p-4 mb-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent hover:border-emerald-500/30 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        Use &quot;{query.trim()}&quot;
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5">Custom location</span>
                    </div>
                    <div className="hidden sm:block px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px] uppercase font-bold tracking-wider text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      Enter ↵
                    </div>
                  </button>
                )}

                {isSearching ? (
                  <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
                    <div className="w-8 h-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-emerald-500 rounded-full animate-spin mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">Searching</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Suggestions
                    </p>
                    {results.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelect(item.name);
                          onClose();
                        }}
                        className="w-full text-left p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-white dark:group-hover:bg-black transition-colors shadow-sm">
                          <MapPin className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{item.name}</span>
                          <span className="text-xs text-zinc-500 mt-1 line-clamp-1">{item.display_name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.length > 2 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
                    <p className="text-sm font-medium">No map suggestions found</p>
                    <p className="text-xs mt-1">You can still use this as a custom address</p>
                  </div>
                ) : query.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                    <MapPin className="w-12 h-12 opacity-20 mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Destination</p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </ClientPortal>
      )}
    </AnimatePresence>
  );
}
