"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Award, Compass, Shield, ArrowRight } from "lucide-react";
import { WATCH_DATA } from "@/data/watchData";

export default function AtelierPhilosophy() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const chapter = WATCH_DATA.craftsmanshipChapters[activeChapterIndex];

  return (
    <section id="craftsmanship" className="relative py-28 bg-[#0a0a0e] text-white border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
              <span>CHAPTER II</span>
              <span>•</span>
              <span>THE GENEVA METIERS D&apos;ART</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
              CRAFTED BY HAND. <span className="italic gold-gradient-text">GUIDED BY MASTERY.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Every millimeter of the Calibre AT-980-SK represents centuries of Swiss horological heritage, fused with cutting-edge aerospace metallurgic science.
          </p>
        </div>

        {/* Master Artisan Quote Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#14141d] via-[#101017] to-[#14141d] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-3">
              STATEMENT FROM THE MASTER HOROLOGIST
            </div>
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-200 font-light italic leading-snug">
              &ldquo;We did not build this timepiece merely to measure seconds. We sculpted it to reveal the perpetual conversation between gravity, tension, and human artistry.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-serif font-bold">
                Æ
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wider text-white">Henri de Chateaubriand</div>
                <div className="text-xs text-neutral-400 font-mono">Master Watchmaker • Atelier de Genève</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Chapters Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chapter Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {WATCH_DATA.craftsmanshipChapters.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`p-6 rounded-xl text-left transition-all duration-300 border ${
                  activeChapterIndex === idx
                    ? "bg-[#181824] border-[#d4af37] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono tracking-[0.2em] text-[#d4af37]">
                    PILLAR {item.number}
                  </span>
                  {activeChapterIndex === idx && (
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Active Chapter Details & Imagery */}
          <div className="lg:col-span-7">
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* High-res Image */}
              <div className="relative h-[280px] sm:h-[360px] w-full">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-black/30" />
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-mono text-[#f3e5ab] uppercase tracking-wider">
                  Geneva Atelier Standard
                </div>
              </div>

              {/* Text Description and Specs */}
              <div className="p-6 sm:p-8">
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                  {chapter.description}
                </p>

                {/* Metrics Pills */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {chapter.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">{m.label}</div>
                      <div className="text-sm sm:text-base font-semibold text-[#f3e5ab] font-mono mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
