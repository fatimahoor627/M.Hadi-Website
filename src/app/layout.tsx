import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aeterna-horlogerie.ch"),
  title: "AETERNA | Vanguard Skeleton Flying Tourbillon — Haute Horlogerie Suisse",
  description: "Experience the pinnacle of Swiss mechanical watchmaking. The AETERNA Vanguard Skeleton Tourbillon features a Grade 5 Titanium case, 72-hour power reserve, and 60-second flying tourbillon carriage.",
  keywords: [
    "Luxury Watch",
    "Tourbillon",
    "Haute Horlogerie",
    "Swiss Made",
    "Skeleton Watch",
    "Titanium Timepiece",
    "Geneva Atelier",
    "Aeterna Watches"
  ],
  authors: [{ name: "Aeterna Haute Horlogerie" }],
  openGraph: {
    title: "AETERNA | Vanguard Skeleton Flying Tourbillon",
    description: "Defying gravitational distortions. Handcrafted in Geneva with 248 components, Grade 5 Titanium, and 72-hour twin-barrel reserve.",
    url: "https://aeterna-horlogerie.ch",
    siteName: "AETERNA Geneva",
    images: [
      {
        url: "/images/hero-watch.jpg",
        width: 1200,
        height: 1200,
        alt: "Aeterna Vanguard Skeleton Tourbillon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AETERNA | Vanguard Skeleton Flying Tourbillon",
    description: "Swiss Haute Horlogerie perfection. Limited to 50 handcrafted pieces worldwide.",
    images: ["/images/hero-watch.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Structured Schema.org Product data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "AETERNA Vanguard Skeleton Flying Tourbillon",
              image: "/images/hero-watch.jpg",
              description: "Swiss haute horlogerie skeleton watch with 60-second flying tourbillon, Grade 5 titanium case, and 72-hour power reserve.",
              brand: {
                "@type": "Brand",
                name: "AETERNA Geneva"
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "148000",
                availability: "https://schema.org/LimitedAvailability",
                seller: {
                  "@type": "Organization",
                  name: "AETERNA Haute Horlogerie SA"
                }
              }
            })
          }}
        />
      </head>
      <body className="bg-[#08080a] text-[#f4f4f6] min-h-screen flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#08080a] antialiased">
        {children}
      </body>
    </html>
  );
}
