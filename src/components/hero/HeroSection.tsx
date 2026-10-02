"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Activity, ArrowDown, ChevronRight, Eye, Phone, Box } from "lucide-react";
import { WATCH_DATA } from "@/data/watchData";

interface HeroSectionProps {
  onOpenReserve: () => void;
  onOpenLoupe: () => void;
}

export default function HeroSection({ onOpenReserve, onOpenLoupe }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tourbillonAngle, setTourbillonAngle] = useState(0);

  // 60-second tourbillon rotation tracker
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTourbillonAngle((elapsed * 6) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-between items-center overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500"
    >
      {/* Background Radial Glow & Horology Geometry */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[var(--accent-glow)] rounded-full blur-[150px] transition-colors duration-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-white/[0.04] rounded-full animate-[spin_120s_linear_infinite]" />
        <div className="absolute inset-0 horology-grid opacity-20" />
      </div>

      {/* Top Editorial Eyebrow */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-[var(--border-accent)] backdrop-blur-md mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--accent-secondary)]">
            {WATCH_DATA.brand} • {WATCH_DATA.editionType}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
            [{WATCH_DATA.reference}]
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-light leading-[1.05]"
        >
          HADI&apos;S <span className="italic font-normal gold-gradient-text">VANGUARD TOURBILLON</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-xs sm:text-sm md:text-base font-light tracking-[0.2em] text-neutral-400 uppercase max-w-2xl mx-auto"
        >
          60-Second Flying Tourbillon • Grade 5 Titanium • Twin-Barrel Calibre 980-SK
        </motion.p>
      </div>

      {/* Main Watch Showcase with Interactive 3D Physics */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-4 sm:my-8 px-4 flex flex-col items-center justify-center">
        <motion.div
          style={{
            transform: `perspective(1200px) rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg)`,
            transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] flex items-center justify-center group cursor-pointer"
          onClick={onOpenLoupe}
        >
          {/* Dynamic Ambient Reflection Halo */}
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, var(--accent-glow) 0%, rgba(0,0,0,0) 65%)`,
            }}
          />

          {/* High-Res Hero Watch Image */}
          <div className="relative w-full h-full p-4 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
            <Image
              src="/images/hero-watch.jpg"
              alt="Hadi's Premium Watch Vanguard Skeleton Flying Tourbillon"
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 500px, 600px"
              className="object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Interactive Inspection Pill Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-full bg-black/80 border border-[var(--border-accent)] backdrop-blur-md shadow-2xl flex items-center gap-2 pointer-events-none">
            <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="text-[11px] font-mono tracking-widest text-white uppercase">
              Click to Open 4X Macro Loupe
            </span>
          </div>

          {/* Floating Escapement Telemetry Marker */}
          <div className="absolute top-1/4 -right-2 sm:right-4 hidden sm:flex flex-col items-start p-3 rounded-xl bg-[#121218]/80 border border-white/10 backdrop-blur-md shadow-xl text-left">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--accent-secondary)] uppercase">
              <Activity className="w-3 h-3 text-[var(--accent-primary)] animate-pulse" />
              <span>Tourbillon Live Arc</span>
            </div>
            <div className="text-sm font-mono font-bold text-white mt-1">
              {tourbillonAngle.toFixed(1)}° <span className="text-[10px] text-neutral-400 font-normal">/ 360°</span>
            </div>
            <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)] transition-all duration-100"
                style={{ width: `${(tourbillonAngle / 360) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Telemetry Grid & Action CTAs */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {WATCH_DATA.heroTelemetry.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="p-3 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-colors flex flex-col justify-between backdrop-blur-sm"
            >
              <div className="text-[10px] font-mono text-[var(--accent-primary)] tracking-[0.2em]">
                {item.label}
              </div>
              <div className="text-sm sm:text-base font-semibold text-white tracking-wide mt-1">
                {item.value}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">
                {item.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--accent-primary)] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_var(--accent-glow)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"
          >
            <span>Request Bespoke Allocation</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>

          <a
            href="#mechanism-3d"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <Box className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Enter 3D Mechanism Lab</span>
          </a>

          <a
            href={`tel:${WATCH_DATA.contactPhone}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>VIP Hotline: {WATCH_DATA.contactPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
