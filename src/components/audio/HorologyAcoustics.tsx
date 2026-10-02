"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export default function HorologyAcoustics() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTickSound = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    let isTick = true;
    // 28,800 beats per hour = 8 beats per second (125ms interval)
    intervalRef.current = setInterval(() => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      const filter = audioCtxRef.current.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.value = isTick ? 3200 : 2800; // Alternating pallet fork impact
      filter.Q.value = 12;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(isTick ? 4200 : 3800, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtxRef.current.currentTime + 0.015);

      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.02);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start(audioCtxRef.current.currentTime);
      osc.stop(audioCtxRef.current.currentTime + 0.025);

      isTick = !isTick;
    }, 125);
  };

  const stopTickSound = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleSound = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopTickSound();
      setIsPlaying(false);
    } else {
      startTickSound();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopTickSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 border ${
          isPlaying
            ? "bg-[#d4af37]/15 border-[#d4af37] text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white"
        }`}
        title={isPlaying ? "Mute Escapement Acoustic" : "Listen to Calibre AT-980-SK (4Hz / 28,800 vph)"}
        aria-label="Toggle mechanical watch acoustic sound"
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-mono text-[10px] hidden sm:inline text-[#d4af37]">4Hz CALIBRE TICKING</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] hidden sm:inline">ACOUSTICS</span>
          </>
        )}
      </button>

      {!hasInteracted && (
        <div className="absolute top-10 right-0 w-48 p-2 rounded-lg bg-[#14141a]/95 border border-[#d4af37]/30 text-[10px] text-white/80 shadow-xl hidden md:flex items-center gap-1.5 backdrop-blur-md pointer-events-none animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>Listen to the 28,800 vph mechanical pulse</span>
        </div>
      )}
    </div>
  );
}
