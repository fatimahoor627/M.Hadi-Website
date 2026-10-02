export interface WatchSpecification {
  category: string;
  items: { label: string; value: string; detail?: string }[];
}

export interface WatchEdition {
  id: string;
  name: string;
  subtitle: string;
  caseMaterial: string;
  bezel: string;
  strap: string;
  price: string;
  limitedPieces: number;
  availableAllocation: number;
  accentColor: string;
  gradientBg: string;
  badge: string;
  image: string;
}

export interface LuxuryTheme {
  id: string;
  name: string;
  tagline: string;
  colorHex: string;
  accentHex: string;
  bgHex: string;
}

export const LUXURY_THEMES: LuxuryTheme[] = [
  {
    id: "obsidian-gold",
    name: "Obsidian & Champagne Gold",
    tagline: "Classic Haute Horlogerie Noir",
    colorHex: "#d4af37",
    accentHex: "#f3e5ab",
    bgHex: "#08080a",
  },
  {
    id: "midnight-platinum",
    name: "Royal Midnight & Ice Platinum",
    tagline: "Oceanic Deep Complication",
    colorHex: "#38bdf8",
    accentHex: "#e2e8f0",
    bgHex: "#050c18",
  },
  {
    id: "emerald-aurum",
    name: "Geneva Emerald & 18K Rose Gold",
    tagline: "Sartorial Racing Atelier",
    colorHex: "#10b981",
    accentHex: "#fbbf24",
    bgHex: "#04140c",
  },
  {
    id: "stealth-monochrome",
    name: "Stealth Gunmetal & Titanium",
    tagline: "Aerospace High-Tech Brutalism",
    colorHex: "#cbd5e1",
    accentHex: "#94a3b8",
    bgHex: "#0c0d10",
  },
  {
    id: "bordeaux-bronze",
    name: "Imperial Bordeaux & Warm Bronze",
    tagline: "Royal Heritage Sovereign",
    colorHex: "#f43f5e",
    accentHex: "#d97706",
    bgHex: "#14060b",
  },
];

export const WATCH_DATA = {
  brand: "HADI'S PREMIUM WATCH",
  brandShort: "HADI",
  tagline: "HAUTE HORLOGERIE GENÈVE",
  contactPhone: "03318071282",
  contactFormatted: "+92 331 8071282",
  whatsappUrl: "https://wa.me/923318071282?text=Hello%2C%20I%20am%20inquiring%20about%20an%20exclusive%20allocation%20of%20Hadi%27s%20Premium%20Watch%20Vanguard%20Tourbillon.",
  modelName: "VANGUARD SKELETON TOURBILLON",
  reference: "REF. HPW-980-SK",
  editionType: "Numbered Masterpiece Edition",
  yearOfRelease: "2026",
  origin: "Geneva • Private Atelier",
  priceEstimate: "$148,000 USD",
  leadTime: "Handcrafted to Order • 12-16 Weeks",
  
  heroTelemetry: [
    { label: "FREQUENCY", value: "28,800 VPH", sub: "4 Hz High-Beat Escapement" },
    { label: "POWER RESERVE", value: "72 HOURS", sub: "Twin-Barrel Calibre" },
    { label: "ESCAPEMENT", value: "FLYING TOURBILLON", sub: "0.28g Titanium Carriage" },
    { label: "WATER RESISTANCE", value: "50 METERS", sub: "5 ATM Individually Tested" },
  ],

  craftsmanshipChapters: [
    {
      id: "metallurgy",
      number: "01",
      title: "AEROSPACE GRADE 5 TITANIUM",
      subtitle: "Uncompromising Strength & Feathery Lightness",
      description: "Machined from a monolithic billet of Ti-6Al-4V aerospace alloy, the 41.5mm case provides extraordinary structural resilience, hypoallergenic touch, and 42% weight reduction compared to traditional stainless steel.",
      metrics: [
        { label: "Total Mass", value: "68 grams" },
        { label: "Vickers Rating", value: "350 HV" },
        { label: "Surface Finish", value: "Micro-blast & Satin" },
      ],
      image: "/images/dial-detail.jpg"
    },
    {
      id: "calibre",
      number: "02",
      title: "CALIBRE HPW-980 FLYING TOURBILLON",
      subtitle: "Defying Gravitational Distortions",
      description: "Positioned at 6 o'clock, the hand-assembled flying tourbillon carriage completes one full revolution every 60 seconds. Featuring an adjusted Glucydur balance wheel and Nivarox-1 hairspring, it guarantees chronometric rate stability to within -1/+2 seconds per day.",
      metrics: [
        { label: "Movement Parts", value: "248 parts" },
        { label: "Jewel Bearings", value: "38 Rubies" },
        { label: "Carriage Weight", value: "0.28 grams" },
      ],
      image: "/images/movement-calibre.jpg"
    },
    {
      id: "anglage",
      number: "03",
      title: "HAUTE HORLOGERIE FINISHING",
      subtitle: "Over 80 Hours of Artisanal Hand-Chamfering",
      description: "Every internal angle, skeleton bridge, and bevel is hand-chamfered (Anglage Main) using gentian wood pegs coated in fine diamond micro-paste. The openworked bridges exhibit Côtes de Genève stripes and circular perlage graining.",
      metrics: [
        { label: "Artisanal Labor", value: "82 Hours" },
        { label: "Internal Corners", value: "34 Sharp Bevels" },
        { label: "Certification", value: "Poinçon de Genève" },
      ],
      image: "/images/craftsmanship-artisan.jpg"
    }
  ],

  specifications: [
    {
      category: "Movement & Calibre",
      items: [
        { label: "Movement Type", value: "In-House Manual-Wind Skeleton Flying Tourbillon", detail: "Calibre HPW-980-SK" },
        { label: "Power Reserve", value: "72 Hours (Twin Glucydur Mainspring Barrels)", detail: "Visible power reserve readout" },
        { label: "Frequency", value: "28,800 vibrations per hour (4 Hz)", detail: "Variable inertia balance wheel" },
        { label: "Number of Jewels", value: "38 Synthetic Rubies set in Gold Chatons", detail: "Frictionless micro-bearings" },
        { label: "Movement Dimensions", value: "Diameter: 32.4 mm | Thickness: 4.9 mm", detail: "Ultra-slim skeleton profile" },
        { label: "Accuracy", value: "+2 / -1 seconds per 24 hours", detail: "Tested in 6 positions and 3 temperatures" },
      ]
    },
    {
      category: "Case & Architecture",
      items: [
        { label: "Case Material", value: "Grade 5 Titanium (Ti-6Al-4V) with DLC Accents", detail: "Hand-polished chamfers" },
        { label: "Case Diameter", value: "41.5 mm", detail: "Ergonomic curved lugs" },
        { label: "Case Thickness", value: "10.8 mm (including domed crystal)", detail: "Cuff-friendly slim profile" },
        { label: "Crystal (Front)", value: "Domed Sapphire with 7-layer Anti-Reflective Coating", detail: "Scratch resistance: 9 Mohs" },
        { label: "Exhibition Caseback", value: "Flat Sapphire Crystal with Anti-Glare treatment", detail: "Laser engraved serial & hallmark" },
        { label: "Water Resistance", value: "50 Meters / 5 ATM / 165 Feet", detail: "Double O-ring screw-down crown" },
      ]
    },
    {
      category: "Dial & Indications",
      items: [
        { label: "Dial Construction", value: "3D Openworked Architectural Skeleton", detail: "Integrated satin-brushed chapter ring" },
        { label: "Hour Markers & Hands", value: "Skeletonized 18K White Gold with Super-LumiNova BGW9", detail: "Emits vivid blue luminescence" },
        { label: "Indications", value: "Off-center Hours, Minutes, Running 60-Second Tourbillon Subdial", detail: "Precision railway track" },
      ]
    },
    {
      category: "Strap & Clasp",
      items: [
        { label: "Primary Strap", value: "Hand-Stitched Mississippiensis Alligator with Rubber Underlay", detail: "Sweat-resistant ergonomic lining" },
        { label: "Secondary Strap", value: "Interchangeable Textured FKM Vulcanized Rubber Strap", detail: "Quick-release spring bar system" },
        { label: "Buckle", value: "Grade 5 Titanium Folding Deployment Clasp with Micro-Adjustment", detail: "Engraved Hadi star insignia" },
      ]
    }
  ] as WatchSpecification[],

  editions: [
    {
      id: "titanium-noir",
      name: "Hadi Vanguard Obsidian Titanium",
      subtitle: "Reference HPW-980-TI • Limited to 50 Pieces Worldwide",
      caseMaterial: "Grade 5 Titanium",
      bezel: "Satin-Brushed Titanium with DLC Screws",
      strap: "Matte Black Alligator & Vulcanized Rubber",
      price: "$148,000",
      limitedPieces: 50,
      availableAllocation: 7,
      accentColor: "#D4AF37",
      gradientBg: "from-zinc-900 via-neutral-900 to-black",
      badge: "Geneva Flagship Edition",
      image: "/images/hero-watch.jpg"
    },
    {
      id: "rose-gold-aurum",
      name: "Hadi Vanguard Aurum 18K Rose Gold",
      subtitle: "Reference HPW-980-RG • Limited to 25 Pieces Worldwide",
      caseMaterial: "18K 5N Rose Gold & Grade 5 Titanium",
      bezel: "Hand-Polished 18K Rose Gold",
      strap: "Cognac Brown Alligator with Gold Contrast Stitching",
      price: "$172,000",
      limitedPieces: 25,
      availableAllocation: 3,
      accentColor: "#E0A96D",
      gradientBg: "from-amber-950/40 via-stone-900 to-black",
      badge: "Master Collectors Series",
      image: "/images/dial-detail.jpg"
    },
    {
      id: "stealth-ceramic",
      name: "Hadi Vanguard Chrono-Ceramique",
      subtitle: "Reference HPW-980-CE • Limited to 15 Pieces Worldwide",
      caseMaterial: "Zirconium Oxide Matte Black Ceramic",
      bezel: "Micro-Beaded Ceramic with Anthracite Accents",
      strap: "Tactical Cordura & Rubber Composite",
      price: "$159,000",
      limitedPieces: 15,
      availableAllocation: 2,
      accentColor: "#708090",
      gradientBg: "from-slate-950 via-zinc-900 to-black",
      badge: "Bespoke Commission",
      image: "/images/movement-calibre.jpg"
    }
  ] as WatchEdition[],

  salons: [
    { city: "Geneva", address: "42 Rue du Rhône, 1204 Genève", tel: "+41 22 819 9000", tz: "CET" },
    { city: "London", address: "14 New Bond Street, Mayfair, London W1S 3SX", tel: "+44 20 7493 0000", tz: "GMT" },
    { city: "New York", address: "645 Madison Avenue, New York, NY 10022", tel: "+1 212 555 0199", tz: "EST" },
    { city: "Tokyo", address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061", tel: "+81 3 3569 0000", tz: "JST" },
    { city: "Dubai", address: "Fashion Avenue, The Dubai Mall, Downtown Dubai", tel: "+971 4 388 0000", tz: "GST" },
  ]
};
