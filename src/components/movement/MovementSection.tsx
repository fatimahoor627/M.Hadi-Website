"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, Zap, Compass, Shield, Cpu, RotateCw } from "lucide-react";

export default function MovementSection() {
  const [speedMode, setSpeedMode] = useState<"realtime" | "slowmo">("realtime");
  const [rotation, setRotation] = useState(0);

  // Escapement balance oscillation simulation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let currentAngle = 0;
    let direction = 1;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // 4 Hz = 8 single vibrations per second
      const speed = speedMode === "realtime" ? 8 : 1.5;
      currentAngle += direction * 280 * dt * speed;

      if (currentAngle > 140) {
        currentAngle = 140;
        direction = -1;
      } else if (currentAngle < -140) {
        currentAngle = -140;
        direction = 1;
      }

      setRotation(currentAngle);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [speedMode]);

  return (
    <section id="calibre" className="relative py-28 bg-[#08080a] text-white border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-3">
            <span>CHAPTER III</span>
            <span>•</span>
            <span>THE BEATING HEART</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
            CALIBRE <span className="italic gold-gradient-text">AT-980-SK</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light">
            An openworked, in-house manual-wind flying tourbillon movement engineered from 248 hand-finished components, beating at 28,800 vibrations per hour.
          </p>
        </div>

        {/* Interactive Calibre Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Movement Macro View with Live Animated Escapement */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-[#101017] shadow-2xl group">
            <Image
              src="/images/movement-calibre.jpg"
              alt="Calibre AT-980-SK Skeleton Movement Macro"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Escapement Simulation Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Visual Oscillator Disc */}
                <div className="relative w-12 h-12 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <div
                    className="w-10 h-0.5 bg-[#f3e5ab] rounded-full absolute"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">
                    Variable-Inertia Balance Wheel
                  </div>
                  <div className="text-[10px] text-[#f3e5ab] font-mono">
                    Current Frequency: {speedMode === "realtime" ? "4.00 Hz (28,800 vph)" : "0.75 Hz (Slow-Motion)"}
                  </div>
                </div>
              </div>

              {/* Speed Controller Mode */}
              <div className="flex items-center bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setSpeedMode("realtime")}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    speedMode === "realtime"
                      ? "bg-[#d4af37] text-black font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Live (4Hz)
                </button>
                <button
                  onClick={() => setSpeedMode("slowmo")}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    speedMode === "slowmo"
                      ? "bg-[#d4af37] text-black font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Slow-Mo
                </button>
              </div>
            </div>
          </div>

          {/* Calibre Engineering Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-xl bg-[#12121a] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
                    60-Second Flying Tourbillon
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Eliminates gravitational errors in vertical orientations.
                  </p>
                </div>
              </div>
              <div className="text-xs text-neutral-300 font-light leading-relaxed">
                Constructed with an ultralight titanium cage weighing only 0.28g, reducing inertia while maximizing energetic efficiency.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#12121a] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
                    Twin-Barrel 72-Hour Reserve
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Constant torque output across 3 complete days.
                  </p>
                </div>
              </div>
              <div className="text-xs text-neutral-300 font-light leading-relaxed">
                Series-coupled mainspring barrels ensure amplitude stability from full wind down to the final hours of reserve.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#12121a] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
                    Chronometric Certification
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Tested across 6 positions &amp; 3 thermal chambers.
                  </p>
                </div>
              </div>
              <div className="text-xs text-neutral-300 font-light leading-relaxed">
                Calibrated to an exacting tolerance of -1/+2 seconds per day, surpassing standard COSC chronometer benchmarks.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
