"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bus, Phone, Menu, X } from "lucide-react";
import Link from "next/link";

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
      className={`fixed top-4 left-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl rounded-full ${
        isScrolled
          ? "bg-slate-950/70 backdrop-blur-2xl border border-white/10 py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] shadow-blue-900/20"
          : "bg-white/5 backdrop-blur-lg border border-white/10 py-4 px-6 shadow-2xl"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <Bus className="w-5 h-5 relative z-10" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter text-white">
            Omni<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Bus</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white hover:text-blue-400 transition-colors text-sm font-medium tracking-wider relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Need help?</span>
              <span className="font-bold text-white leading-none">09956912242</span>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 font-medium hover:text-blue-400 transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 w-full my-2"></div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Need help?</span>
                  <span className="font-bold text-white">09956912242</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
