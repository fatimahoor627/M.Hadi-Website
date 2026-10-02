"use client";

import React, { useState } from "react";
import { WATCH_DATA, WatchSpecification } from "@/data/watchData";
import { FileText, CheckCircle2, Download, Printer } from "lucide-react";

export default function SpecsMatrix() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <section id="specifications" className="relative py-28 bg-[#0a0a0e] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
              <span>CHAPTER VI</span>
              <span>•</span>
              <span>TECHNICAL DOSSIER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
              CHRONOMETRIC <span className="italic gold-gradient-text">SPECIFICATIONS</span>
            </h2>
          </div>
          
          <button
            onClick={() => setShowCertificate(true)}
            className="mt-6 md:mt-0 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#d4af37]/40 text-xs font-mono text-[#f3e5ab] flex items-center gap-2 transition-all hover:scale-105"
          >
            <FileText className="w-4 h-4 text-[#d4af37]" />
            <span>View Official Chronometer Certificate</span>
          </button>
        </div>

        {/* Specification Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {WATCH_DATA.specifications.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono whitespace-nowrap transition-all border ${
                activeTab === idx
                  ? "bg-[#d4af37]/15 border-[#d4af37] text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                  : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Tab Content Table */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {WATCH_DATA.specifications[activeTab].items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-white/[0.02] transition-colors items-center gap-2 sm:gap-4"
              >
                <div className="md:col-span-4 text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="md:col-span-5 text-sm sm:text-base font-medium text-white">
                  {item.value}
                </div>
                <div className="md:col-span-3 text-xs text-neutral-500 font-mono">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#14141d] border border-[#d4af37] rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] text-neutral-200">
            {/* Certificate Header */}
            <div className="text-center pb-6 border-b border-[#d4af37]/30">
              <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#d4af37] mb-1">
                RÉPUBLIQUE ET CANTON DE GENÈVE
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-wide">
                OFFICIAL BULLETIN DE MARCHE
              </h3>
              <div className="text-xs text-neutral-400 font-mono mt-1">
                Manufacture Aeterna • Contrôle Officiel Suisse des Chronomètres
              </div>
            </div>

            {/* Certificate Body Details */}
            <div className="py-6 space-y-4 text-xs sm:text-sm font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Calibre Reference:</span>
                <span className="text-white font-bold">AT-980-SK (Individual No. 07/50)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Escapement:</span>
                <span className="text-white font-bold">60-Sec Flying Tourbillon (0.28g Cage)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Mean Daily Rate:</span>
                <span className="text-emerald-400 font-bold">+0.8 sec / 24h (Tolerated: -1/+2)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Thermal Variation Coefficient:</span>
                <span className="text-white font-bold">0.02 sec/°C (8°C to 38°C)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Hallmark Standard:</span>
                <span className="text-[#d4af37] font-bold">Poinçon de Genève (Geneva Seal #4920)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white flex items-center gap-2 border border-white/10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
