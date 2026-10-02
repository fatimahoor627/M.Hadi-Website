"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import CinematicMechanism3D from "@/components/mechanism/CinematicMechanism3D";
import AtelierPhilosophy from "@/components/craftsmanship/AtelierPhilosophy";
import MovementSection from "@/components/movement/MovementSection";
import MaterialsExplorer from "@/components/craftsmanship/MaterialsExplorer";
import LifestyleShowcase from "@/components/gallery/LifestyleShowcase";
import SpecsMatrix from "@/components/specs/SpecsMatrix";
import BespokeConfigurator from "@/components/concierge/BespokeConfigurator";
import LoupeMagnifier from "@/components/craftsmanship/LoupeMagnifier";
import VIPReservationModal from "@/components/concierge/VIPReservationModal";
import SalonsModal from "@/components/concierge/SalonsModal";
import { WATCH_DATA, WatchEdition } from "@/data/watchData";

export default function Home() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isLoupeOpen, setIsLoupeOpen] = useState(false);
  const [isSalonsOpen, setIsSalonsOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<WatchEdition>(WATCH_DATA.editions[0]);
  const [customEngraving, setCustomEngraving] = useState<string>("COLLECTOR NO. 07");

  const handleSelectEditionForReservation = (edition: WatchEdition, engraving: string) => {
    setSelectedEdition(edition);
    setCustomEngraving(engraving);
    setIsReserveOpen(true);
  };

  const handleBookAtSalon = (city: string) => {
    setIsReserveOpen(true);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--foreground)] selection:bg-[var(--accent-primary)] selection:text-black relative transition-colors duration-500">
      {/* Global Navigation with Theme Selector & Direct VIP Hotline */}
      <Navbar
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenSalons={() => setIsSalonsOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenLoupe={() => setIsLoupeOpen(true)}
      />

      {/* Realistic Cinematic 3D Watch Mechanism Section */}
      <CinematicMechanism3D />

      {/* Atelier Philosophy & Métiers d'Art */}
      <AtelierPhilosophy />

      {/* Calibre HPW-980 & Escapement Simulation */}
      <MovementSection />

      {/* Metallurgy & Materials Science */}
      <MaterialsExplorer />

      {/* Lifestyle & Workshop Showcase */}
      <LifestyleShowcase />

      {/* Chronometer Specifications Matrix */}
      <SpecsMatrix />

      {/* Limited Allocations & Bespoke Configurator */}
      <BespokeConfigurator
        onSelectEditionForReservation={handleSelectEditionForReservation}
      />

      {/* Luxury Footer */}
      <Footer />

      {/* Interactive 4X Optical Loupe Inspector Modal */}
      <LoupeMagnifier
        isOpen={isLoupeOpen}
        onClose={() => setIsLoupeOpen(false)}
      />

      {/* VIP Collector Allocation Modal */}
      <VIPReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        defaultEdition={selectedEdition}
        initialEngraving={customEngraving}
      />

      {/* International Salons Modal */}
      <SalonsModal
        isOpen={isSalonsOpen}
        onClose={() => setIsSalonsOpen(false)}
        onBookAtSalon={handleBookAtSalon}
      />
    </main>
  );
}
