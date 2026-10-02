"use client";

import React, { useState } from "react";
import { WATCH_DATA } from "@/data/watchData";
import { ArrowUp, Shield, Check, Send, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050507] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--accent-glow)] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-[0.2em] text-2xl font-semibold text-white">
                {WATCH_DATA.brand}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
            </div>
            <div className="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase">
              {WATCH_DATA.tagline} • NUMBERED MASTERPIECES
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
              Pioneering the boundary between kinetic gravity compensation, metallurgical durability, and artisanal Swiss finishing.
            </p>

            {/* Direct Contact Phone Box */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="text-xs font-mono text-[var(--accent-secondary)] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>VIP Concierge: <strong>{WATCH_DATA.contactFormatted} ({WATCH_DATA.contactPhone})</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${WATCH_DATA.contactPhone}`}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>Call Direct</span>
                </a>
                <a
                  href={WATCH_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp VIP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--accent-secondary)]">
              Manufacture
            </div>
            <ul className="space-y-2 text-xs font-light text-neutral-400">
              <li>
                <a href="#mechanism-3d" className="hover:text-white transition-colors">
                  Cinematic 3D Mechanism
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Geneva Métiers d&apos;Art
                </a>
              </li>
              <li>
                <a href="#calibre" className="hover:text-white transition-colors">
                  Calibre HPW-980 Flying Tourbillon
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition-colors">
                  Grade 5 Titanium &amp; Sapphire
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  Chronometric Dossier
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Collector Dispatch Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--accent-secondary)]">
              Patrons Gazette
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive confidential allocation notices and private Salon invitations prior to public release.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Collector Email Address"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--accent-primary)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-black font-bold transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[var(--accent-glow)] border border-[var(--accent-primary)] text-xs font-mono text-[var(--accent-secondary)] flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Patron registry recorded. Welcome.</span>
              </div>
            )}
          </div>
        </div>

        {/* Global Ateliers Clock Bar */}
        <div className="py-8 border-b border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center font-mono text-xs">
          {WATCH_DATA.salons.map((s) => (
            <div key={s.city} className="p-2 rounded bg-white/[0.02]">
              <div className="text-[10px] text-[var(--accent-primary)] uppercase">{s.city}</div>
              <div className="text-white font-medium mt-0.5">{s.tz}</div>
            </div>
          ))}
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} HADI&apos;S PREMIUM WATCH SA • GENÈVE • ALL RIGHTS RESERVED • HOTLINE: {WATCH_DATA.contactPhone}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-[var(--accent-primary)] transition-colors focus:outline-none"
          >
            <span>TOP OF MANUFACTURE</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
