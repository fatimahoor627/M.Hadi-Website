"use client";

import React, { useState } from "react";
import { Shield, Sparkles, Gem, Layers } from "lucide-react";

const MATERIALS = [
  {
    id: "titanium",
    name: "Aerospace Grade 5 Titanium",
    formula: "Ti-6Al-4V",
    desc: "A titanium alloy containing 6% aluminum and 4% vanadium. Possesses one of the highest strength-to-density ratios of any metal, completely resistant to saltwater and skin perspiration.",
    vickersHardness: "350 HV",
    density: "4.43 g/cm³",
    weightReduction: "42% lighter than Steel",
    finish: "Hand-satin brushed with mirror anglage",
    icon: Layers,
  },
  {
    id: "sapphire",
    name: "Synthetic Corundum Sapphire",
    formula: "Al₂O₃ Single Crystal",
    desc: "Flame-fusion synthetic sapphire with a hardness second only to diamond. Enhanced with a 7-layer anti-reflective treatment on both inner and outer surfaces for crystal clarity.",
    vickersHardness: "2,000 HV (9 Mohs)",
    density: "3.98 g/cm³",
    weightReduction: "Scratch-Proof In Everyday Life",
    finish: "Diamond-machined optical curvature",
    icon: Gem,
  },
  {
    id: "gold",
    name: "18K 5N+ Rose & White Gold",
    formula: "Au 750 / Cu / Ag / Pt",
    desc: "Custom metallurgical gold formulation enriched with platinum to permanently stabilize the deep rose hue against chlorine and environmental fading across generations.",
    vickersHardness: "160 HV",
    density: "15.5 g/cm³",
    weightReduction: "Heirloom Precious Mass",
    finish: "Micro-bead blasted with bevelled perimeter",
    icon: Sparkles,
  },
];

export default function MaterialsExplorer() {
  const [selectedMat, setSelectedMat] = useState(MATERIALS[0]);

  return (
    <section id="materials" className="relative py-28 bg-[#0a0a0e] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
              <span>CHAPTER IV</span>
              <span>•</span>
              <span>MATERIALITY &amp; SCIENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
              ENGINEERED <span className="italic gold-gradient-text">FOR ETERNITY</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Every element is selected not merely for its aesthetic grandeur, but for its thermodynamic stability, structural longevity, and tactile perfection.
          </p>
        </div>

        {/* Interactive Material Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MATERIALS.map((mat) => {
            const Icon = mat.icon;
            const isSelected = selectedMat.id === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMat(mat)}
                className={`p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1c1c28] to-[#12121a] border-[#d4af37] shadow-[0_10px_35px_rgba(212,175,55,0.15)] scale-[1.02]"
                    : "bg-[#101016] border-white/10 hover:border-white/20 hover:bg-[#14141c]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${
                      isSelected ? "bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab]" : "bg-white/5 border-white/10 text-neutral-400"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-[#d4af37] tracking-wider uppercase">
                      {mat.formula}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-medium mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {mat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Vickers Hardness:</span>
                    <span className="font-mono text-[#f3e5ab] font-bold">{mat.vickersHardness}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Density:</span>
                    <span className="font-mono text-white">{mat.density}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Key Advantage:</span>
                    <span className="font-mono text-[#d4af37] text-[11px]">{mat.weightReduction}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
