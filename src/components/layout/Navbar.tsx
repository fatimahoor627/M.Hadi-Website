"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare, Sparkles, MapPin } from "lucide-react";
import HorologyAcoustics from "../audio/HorologyAcoustics";
import ThemeSelector from "../theme/ThemeSelector";
import { WATCH_DATA } from "@/data/watchData";

interface NavbarProps {
  onOpenReserve: () => void;
  onOpenSalons: () => void;
}

export default function Navbar({ onOpenReserve, onOpenSalons }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [genevaTime, setGenevaTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Zurich",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setGenevaTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: "3D Mechanism", href: "#mechanism-3d" },
    { label: "Craftsmanship", href: "#craftsmanship" },
    { label: "Calibre 980-SK", href: "#calibre" },
    { label: "Materiality", href: "#materials" },
    { label: "Specifications", href: "#specifications" },
    { label: "Editions", href: "#editions" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg-primary)]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a href="#" className="group flex flex-col items-start focus:outline-none">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.2em] text-lg sm:text-2xl font-semibold text-white group-hover:text-[var(--accent-primary)] transition-colors">
              {WATCH_DATA.brand}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          </div>
          <span className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase font-mono">
            {WATCH_DATA.tagline}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs uppercase tracking-[0.16em] text-neutral-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[var(--accent-secondary)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-primary)] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Stack */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct VIP Hotline */}
          <a
            href={`tel:${WATCH_DATA.contactPhone}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[var(--accent-secondary)] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title={`Direct VIP Concierge: ${WATCH_DATA.contactFormatted}`}
          >
            <Phone className="w-3 h-3 text-[var(--accent-primary)]" />
            <span className="text-[11px] font-bold">{WATCH_DATA.contactPhone}</span>
          </a>

          {/* Theme Selector Widget */}
          <ThemeSelector />

          {/* Procedural Watch Acoustics */}
          <HorologyAcoustics />

          {/* Bespoke Allocation CTA */}
          <button
            onClick={onOpenReserve}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 bg-[var(--accent-primary)] text-black shadow-[0_0_20px_var(--accent-glow)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Inquire</span>
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:text-[var(--accent-primary)] bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
              <span>VIP CONCIERGE HOTLINE</span>
              <a
                href={`tel:${WATCH_DATA.contactPhone}`}
                className="text-[var(--accent-primary)] font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{WATCH_DATA.contactPhone}</span>
              </a>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-300 hover:text-[var(--accent-primary)] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-3 pt-3">
              <a
                href={WATCH_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg border border-emerald-500/40 text-xs font-medium uppercase tracking-wider text-emerald-400 text-center bg-emerald-500/10 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp VIP</span>
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenReserve();
                }}
                className="flex-1 py-2.5 rounded-lg bg-[var(--accent-primary)] text-black text-xs font-bold uppercase tracking-wider text-center"
              >
                Request Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
