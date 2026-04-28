"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bus, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#features" },
    { name: "Fleet", href: "#fleet" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-4 left-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl rounded-2xl ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 py-3 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-black/20"
          : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-800/30 py-4 px-6 shadow-sm dark:shadow-none"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-2.5 rounded-xl group-hover:bg-zinc-800 dark:group-hover:bg-white transition-colors duration-300 shadow-sm overflow-hidden">
            <Bus className="w-5 h-5 relative z-10" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-50">
            Omni<span className="text-zinc-500 dark:text-zinc-400">Bus</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors text-sm font-medium tracking-wide relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-zinc-900 dark:bg-zinc-100 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA & Theme */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200 border-l border-zinc-200 dark:border-zinc-800 pl-6">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-full text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-0.5">
                Need help?
              </span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-none">09956912242</span>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 mt-4 -mx-6 px-6 overflow-hidden rounded-b-2xl shadow-lg dark:shadow-black/20"
          >
            <div className="py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-600 dark:text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full my-2"></div>
              <div className="flex items-center gap-3 pb-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full text-zinc-900 dark:text-zinc-100">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Need help?
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">09956912242</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
