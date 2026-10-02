"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WATCH_DATA, WatchEdition } from "@/data/watchData";
import { Sparkles, Check, Shield, AlertCircle, ChevronRight, PenTool } from "lucide-react";

interface ConfiguratorProps {
  onSelectEditionForReservation: (edition: WatchEdition, customEngraving: string) => void;
}

export default function BespokeConfigurator({ onSelectEditionForReservation }: ConfiguratorProps) {
  const [selectedEdition, setSelectedEdition] = useState<WatchEdition>(WATCH_DATA.editions[0]);
  const [strapOption, setStrapOption] = useState<"alligator" | "rubber">("alligator");
  const [engraving, setEngraving] = useState<string>("COLLECTOR NO. 07");

  return (
    <section id="editions" className="relative py-28 bg-[#08080a] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
            <span>CHAPTER VII</span>
            <span>•</span>
            <span>BESPOKE ATELIER COMMISSIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
            THE LIMITED <span className="italic gold-gradient-text">ALLOCATIONS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light">
            Individually numbered timepieces crafted exclusively for registered patrons and collectors of Haute Horlogerie.
          </p>
        </div>

        {/* 3 Editions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {WATCH_DATA.editions.map((ed) => {
            const isSelected = selectedEdition.id === ed.id;
            return (
              <div
                key={ed.id}
                onClick={() => setSelectedEdition(ed)}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-500 border ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1c1c28] via-[#12121a] to-[#0a0a0e] border-[#d4af37] shadow-[0_15px_40px_rgba(212,175,55,0.2)] scale-[1.02]"
                    : "bg-[#101016]/80 border-white/10 hover:border-white/20 hover:bg-[#14141c]"
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
                    {ed.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{ed.availableAllocation} Allocations Left</span>
                  </div>
                </div>

                {/* Watch Preview */}
                <div className="relative h-60 w-full my-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={ed.image}
                    alt={ed.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title and Specs */}
                <div className="mt-4">
                  <h3 className="font-serif text-2xl text-white font-medium mb-1">
                    {ed.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mb-4">
                    {ed.subtitle}
                  </p>

                  <div className="space-y-2 py-4 border-t border-white/10 text-xs font-mono text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Case Alloy:</span>
                      <span className="text-white">{ed.caseMaterial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Bezel:</span>
                      <span className="text-white">{ed.bezel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Worldwide Cap:</span>
                      <span className="text-[#f3e5ab] font-bold">{ed.limitedPieces} Pieces Only</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Acquisition Value</div>
                      <div className="text-xl font-bold font-mono text-[#f3e5ab]">{ed.price} <span className="text-xs font-normal text-neutral-400">USD</span></div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEdition(ed);
                        onSelectEditionForReservation(ed, engraving);
                      }}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1 transition-all ${
                        isSelected
                          ? "bg-[#d4af37] text-black hover:bg-[#f3e5ab]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <span>Reserve</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bespoke Personalization Workbench */}
        <div className="p-8 rounded-2xl bg-[#12121c] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                Atelier Personalization &amp; Serial Request
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                Selected: <span className="text-[#f3e5ab] font-bold">{selectedEdition.name}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Caseback Engraving Live Preview */}
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Custom Caseback Laser Inscription (Up to 24 characters):
              </label>
              <input
                type="text"
                maxLength={24}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                placeholder="E.G., SIR ARTHUR V. 2026"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-[#d4af37]/40 text-sm font-mono text-[#f3e5ab] uppercase tracking-widest focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />

              {/* Strap Choice */}
              <div className="pt-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Complimentary Secondary Strap Choice:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStrapOption("alligator")}
                    className={`p-3 rounded-xl text-xs font-mono text-left border ${
                      strapOption === "alligator"
                        ? "bg-[#d4af37]/15 border-[#d4af37] text-white"
                        : "bg-white/5 border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="font-bold">Mississippi Alligator</div>
                    <div className="text-[10px] text-neutral-400">Hand-rolled edges</div>
                  </button>

                  <button
                    onClick={() => setStrapOption("rubber")}
                    className={`p-3 rounded-xl text-xs font-mono text-left border ${
                      strapOption === "rubber"
                        ? "bg-[#d4af37]/15 border-[#d4af37] text-white"
                        : "bg-white/5 border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="font-bold">Vulcanized FKM Rubber</div>
                    <div className="text-[10px] text-neutral-400">Integrated nautical texture</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Caseback Simulation Plate */}
            <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-tr from-[#161620] via-[#20202c] to-[#12121a] border-2 border-[#d4af37]/40 flex flex-col items-center justify-center p-6 shadow-inner text-center">
              <div className="w-16 h-16 rounded-full border border-dashed border-[#d4af37]/40 flex items-center justify-center mb-3">
                <span className="font-serif text-[#d4af37] text-xl font-bold">Æ</span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase">
                AETERNA MANUFACTURE GENÈVE • POINÇON SEAL
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1">
                TI-6AL-4V • 50M WATER RESISTANT • SAPPHIRE BACK
              </div>
              <div className="mt-3 px-4 py-1.5 rounded bg-black/60 border border-[#d4af37]/60 text-xs sm:text-sm font-mono font-bold text-[#f3e5ab] tracking-[0.2em]">
                {engraving || "BESPOKE ENGRAVING"}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>Certified under Swiss Haute Horlogerie Federation Protocol</span>
            </div>

            <button
              onClick={() => onSelectEditionForReservation(selectedEdition, engraving)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8624] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Initiate Allocation Protocol</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
