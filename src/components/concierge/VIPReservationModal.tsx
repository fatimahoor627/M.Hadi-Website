"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { WATCH_DATA, WatchEdition } from "@/data/watchData";
import { X, Check, Sparkles, MapPin, Calendar, ShieldCheck, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEdition?: WatchEdition;
  initialEngraving?: string;
}

export default function VIPReservationModal({
  isOpen,
  onClose,
  defaultEdition = WATCH_DATA.editions[0],
  initialEngraving = "COLLECTOR NO. 07",
}: ModalProps) {
  const [selectedEdition, setSelectedEdition] = useState<WatchEdition>(defaultEdition);
  const [selectedSerial, setSelectedSerial] = useState<string>("07 / 50");
  const [salon, setSalon] = useState<string>("Geneva");
  const [meetingType, setMeetingType] = useState<"in-person" | "virtual">("in-person");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [dossierNumber, setDossierNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `HPW-GEN-${Math.floor(100000 + Math.random() * 900000)}`;
    setDossierNumber(token);
    setSubmitted(true);

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#ffffff", "#38bdf8"],
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e0e14] border border-[var(--border-accent)] rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] text-white overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-2 rounded-lg text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--accent-secondary)] mb-1">
                {WATCH_DATA.brand} • DIRECT CONCIERGE
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Request Masterpiece Allocation
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {selectedEdition.name} • {selectedEdition.price} USD
              </p>
            </div>

            {/* Direct Phone Concierge Hotline Strip */}
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Phone className="w-4 h-4 shrink-0" />
                <span>Instant Concierge Direct Line: <strong>{WATCH_DATA.contactPhone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${WATCH_DATA.contactPhone}`}
                  className="px-3 py-1 rounded bg-emerald-500 text-black text-xs font-bold font-mono hover:bg-emerald-400 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={WATCH_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono hover:bg-emerald-500/30 transition-colors flex items-center gap-1 border border-emerald-500/40"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Allocation Serial Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  1. Select Available Serial Allocation:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {["03 / 50", "07 / 50", "12 / 50", "28 / 50"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedSerial(num)}
                      className={`py-2 px-3 rounded-lg text-xs font-mono border text-center transition-colors ${
                        selectedSerial === num
                          ? "bg-[var(--accent-glow)] border-[var(--accent-primary)] text-[var(--accent-secondary)] font-bold"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      Piece #{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salon Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  2. Preferred Private Consultation Salon:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {WATCH_DATA.salons.map((s) => (
                    <button
                      key={s.city}
                      type="button"
                      onClick={() => setSalon(s.city)}
                      className={`p-2.5 rounded-lg text-xs font-mono border text-left transition-colors flex items-center gap-2 ${
                        salon === s.city
                          ? "bg-[var(--accent-glow)] border-[var(--accent-primary)] text-white font-bold"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>{s.city} Atelier</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collector Credentials */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  3. Patron Credentials:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Legal Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Private Email Address"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Direct Phone / VIP Concierge Mobile"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] font-mono text-neutral-500">
                  Strictly Confidential • Non-Binding Allocation
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[var(--accent-primary)] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_var(--accent-glow)] hover:scale-105 transition-all font-bold"
                >
                  Submit Allocation Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)] flex items-center justify-center mx-auto mb-6 text-[var(--accent-primary)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-[var(--accent-secondary)] mb-2">
              COMMISSION TRANSMITTED
            </div>

            <h3 className="font-serif text-3xl text-white font-medium mb-3">
              Honored, {name || "Patron"}.
            </h3>

            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
              Your provisional allocation for <strong className="text-white">{selectedEdition.name} (Piece #{selectedSerial})</strong> has been registered in the manufacture ledger.
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-[var(--border-accent)] max-w-sm mx-auto mb-6 font-mono text-xs text-neutral-300 space-y-1">
              <div>DOSSIER PROTOCOL ID:</div>
              <div className="text-base font-bold text-[var(--accent-secondary)] tracking-widest">{dossierNumber}</div>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <a
                href={`tel:${WATCH_DATA.contactPhone}`}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold font-mono flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Concierge ({WATCH_DATA.contactPhone})</span>
              </a>
            </div>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full bg-[var(--accent-primary)] text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Return to Manufacture
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
