"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Award, ShieldCheck, Clock } from "lucide-react";

export default function LifestyleShowcase() {
  return (
    <section className="relative py-28 bg-[#08080a] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
            <span>CHAPTER V</span>
            <span>•</span>
            <span>THE COLLECTOR&apos;S EXPERIENCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
            WHERE HAUTE COUTURE <br />
            <span className="italic gold-gradient-text">MEETS CHRONOMETRIC ART</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light">
            Designed for connoisseurs who appreciate the harmony between discreet sartorial elegance and the uninhibited mechanical theater of an openworked tourbillon.
          </p>
        </div>

        {/* Dual Cinematic Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: The Sartorial Lifestyle */}
          <div className="relative h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <Image
              src="/images/lifestyle-wrist.jpg"
              alt="Collector wearing the Aeterna Vanguard Skeleton Tourbillon"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-2">
                WRIST PRESENCE • 41.5 MM
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
                Understated Modern Elegance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Slips effortlessly beneath the cuff of a bespoke Savile Row suit or complements modern technical tailoring with natural poise.
              </p>
            </div>
          </div>

          {/* Card 2: The Geneva Atelier Workstation */}
          <div className="relative h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <Image
              src="/images/craftsmanship-artisan.jpg"
              alt="Master horologist at Geneva workbench assembling tourbillon carriage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-2">
                GENEVA ATELIER • INDIVIDUAL REGULATION
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
                One Watchmaker, One Timepiece
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Each Vanguard timepiece is assembled, regulated, and cased by a single master horologist from start to final chronometric sign-off.
              </p>
            </div>
          </div>
        </div>

        {/* Collector Guarantee Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-2xl bg-[#111118] border border-[#d4af37]/20">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Poinçon de Genève</div>
              <div className="text-xs text-neutral-400 font-mono">Official Hallmark of Origin</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">5-Year International Warranty</div>
              <div className="text-xs text-neutral-400 font-mono">Complimentary First Service</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Bespoke Archival Ledger</div>
              <div className="text-xs text-neutral-400 font-mono">Registered in Geneva Archives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
