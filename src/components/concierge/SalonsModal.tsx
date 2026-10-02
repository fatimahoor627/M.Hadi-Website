"use client";

import React from "react";
import { WATCH_DATA } from "@/data/watchData";
import { X, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

interface SalonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAtSalon: (city: string) => void;
}

export default function SalonsModal({ isOpen, onClose, onBookAtSalon }: SalonsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#0e0e14] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-white/10 pb-6 mb-8">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-1">
            WORLDWIDE ATELIERS &amp; PRIVATE SALONS
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-light text-white">
            International Boutiques
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Private viewings by prior appointment only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WATCH_DATA.salons.map((salon) => (
            <div
              key={salon.city}
              className="p-6 rounded-xl bg-[#14141d] border border-white/10 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-2xl text-white font-medium">
                    {salon.city} Atelier
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                    {salon.tz}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span className="font-mono">{salon.tel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Mon - Sat: 10:00 - 19:00 (Private Salons)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    onClose();
                    onBookAtSalon(salon.city);
                  }}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[#d4af37] hover:text-black border border-white/10 hover:border-[#d4af37] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <span>Book Private Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
