"use client";

import React, { useState, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import { LUXURY_THEMES, LuxuryTheme } from "@/data/watchData";

export default function ThemeSelector() {
  const [activeTheme, setActiveTheme] = useState<string>("obsidian-gold");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hadi_luxury_theme") || "obsidian-gold";
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("hadi_luxury_theme", themeId);
  };

  const currentThemeObj = LUXURY_THEMES.find((t) => t.id === activeTheme) || LUXURY_THEMES[0];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border border-white/10 hover:border-[var(--accent-primary)] bg-white/5 hover:bg-white/10 text-white"
        title="Customize Atelier Color Palette"
        aria-label="Toggle Luxury Theme Selector"
      >
        <div
          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
          style={{ backgroundColor: currentThemeObj.colorHex }}
        />
        <span className="font-mono text-[11px] hidden md:inline uppercase tracking-wider">
          {currentThemeObj.name.split(" ")[0]}
        </span>
        <Palette className="w-3.5 h-3.5 text-neutral-400" />
      </button>

      {/* Floating Theme Dropdown Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 w-72 sm:w-80 p-4 rounded-2xl bg-[#0e0e16]/95 border border-[var(--border-accent)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Horological Palettes</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                5 BESPOKE EDITIONS
              </span>
            </div>

            <div className="space-y-2">
              {LUXURY_THEMES.map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      handleSelectTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? "bg-white/10 border-[var(--accent-primary)] text-white shadow-lg"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/15 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Dual-Color Swatch */}
                      <div className="flex -space-x-1.5 items-center">
                        <div
                          className="w-4 h-4 rounded-full border border-black/40 shadow"
                          style={{ backgroundColor: theme.colorHex }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black/40 shadow"
                          style={{ backgroundColor: theme.accentHex }}
                        />
                      </div>

                      <div>
                        <div className="text-xs font-medium tracking-wide">
                          {theme.name}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          {theme.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
