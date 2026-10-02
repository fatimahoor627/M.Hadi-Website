"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, X, Sparkles, Crosshair, Check } from "lucide-react";

interface LoupeProps {
  isOpen: boolean;
  onClose: () => void;
}

const HOTSPOTS = [
  {
    id: "tourbillon",
    label: "Flying Tourbillon Carriage",
    desc: "Single-axis cage crafted from Grade 5 titanium, rotating once every 60 seconds. Compensates for positional rate errors.",
    x: 50,
    y: 78,
  },
  {
    id: "barrel",
    label: "Twin Glucydur Barrels",
    desc: "Provides a constant torque curve over 72 hours with skeletonized openwork spring cover.",
    x: 50,
    y: 28,
  },
  {
    id: "anglage",
    label: "Hand-Chamfered Bridges (Anglage)",
    desc: "Internal sharp angles mirror-polished with gentian wood pegs and diamond micro-paste.",
    x: 75,
    y: 48,
  },
  {
    id: "jewels",
    label: "Gold Chatons & Ruby Bearings",
    desc: "38 synthetic corundum rubies set in 18K solid gold chatons for minimal kinetic friction.",
    x: 28,
    y: 42,
  },
];

export default function LoupeMagnifier({ isOpen, onClose }: LoupeProps) {
  const [zoomLevel, setZoomLevel] = useState<2 | 3 | 4>(3);
  const [activeHotspot, setActiveHotspot] = useState<string | null>("tourbillon");
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPos({ x, y });
  };

  const selectedSpot = HOTSPOTS.find((h) => h.id === activeHotspot);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#0d0d12] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30">
              <Crosshair className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                Atelier Macro Loupe Inspector
              </h3>
              <p className="text-xs font-mono tracking-widest text-[#f3e5ab] uppercase">
                Calibre AT-980-SK • Micro-Finishing Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-1">
              {[2, 3, 4].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z as 2 | 3 | 4)}
                  className={`px-2.5 py-1 text-xs font-mono rounded ${
                    zoomLevel === z
                      ? "bg-[#d4af37] text-black font-bold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {z}X
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
              aria-label="Close Loupe Inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loupe Interactive Area & Info Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Magnification Canvas */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onClick={(e) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setPos({ x, y });
            }}
            className="lg:col-span-7 relative h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-white/10 bg-black cursor-crosshair group shadow-inner"
          >
            {/* Background High-Res Image */}
            <div
              className="absolute inset-0 transition-transform duration-75"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `${pos.x}% ${pos.y}%`,
              }}
            >
              <Image
                src="/images/dial-detail.jpg"
                alt="Watch Calibre Macro Zoom"
                fill
                className="object-cover"
              />
            </div>

            {/* Crosshair Overlay in Center of Loupe */}
            <div
              className="absolute pointer-events-none w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#d4af37]/60" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#d4af37]/60" />
            </div>

            {/* Hotspot Markers */}
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(h.id);
                  setPos({ x: h.x, y: h.y });
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  activeHotspot === h.id
                    ? "bg-[#d4af37] text-black scale-125 ring-4 ring-[#d4af37]/40 shadow-lg"
                    : "bg-black/80 text-white border border-[#d4af37] hover:scale-110"
                }`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                title={h.label}
              >
                <Sparkles className="w-3 h-3" />
              </button>
            ))}

            <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 text-[10px] font-mono text-neutral-400 border border-white/10 pointer-events-none">
              PAN MOUSE OR TOUCH TO MAGNIFY ({zoomLevel}X)
            </div>
          </div>

          {/* Hotspot Information Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#14141c]/60 p-6 rounded-xl border border-white/5">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase mb-2">
                FOCAL SPECIFICATION
              </div>
              <h4 className="font-serif text-2xl text-white font-medium mb-3">
                {selectedSpot?.label || "Select a Focal Area"}
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedSpot?.desc}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-[11px] font-mono text-neutral-400 mb-3 uppercase">
                Explore Calibre Focal Points:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActiveHotspot(h.id);
                      setPos({ x: h.x, y: h.y });
                    }}
                    className={`p-2 rounded-lg text-left text-xs transition-colors border ${
                      activeHotspot === h.id
                        ? "bg-[#d4af37]/15 border-[#d4af37] text-[#f3e5ab]"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="font-medium truncate">{h.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
