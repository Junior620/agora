import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getMetadataBase, getSiteUrl } from "@/lib/site";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteName = "Agora Film Invest";
const titleDefault = `${siteName} — Production & promotion cinéma (Caraïbe, Afrique, Europe)`;
/** Texte pour Google / réseaux sociaux : qui vous êtes, ce que vous faites, où — sans jargon « vitrine ». */
const description =
  "Société de production et de promotion cinématographique basée aux Caraïbes : Agora Film Invest accompagne auteurs et projets (documentaires, fictions, séries), co-produit avec l’Afrique, l’Europe et les Amériques, et présente ses réalisations, son équipe et ses partenaires — dont le Festival de Cannes et les marchés professionnels.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: titleDefault,
    template: `%s | ${siteName}`,
  },
  description,
  /* Favicon / Apple : générés par app/icon.tsx et app/apple-icon.tsx (haute résolution, lisibles à petite taille). */
  applicationName: siteName,
  authors: [{ name: siteName, url: getSiteUrl() }],
  creator: siteName,
  publisher: siteName,
  category: "cinéma",
  keywords: [
    "Agora Film Invest",
    "production cinéma",
    "coproduction",
    "Caraïbe",
    "Afrique",
    "documentaire",
    "festival de Cannes",
    "producteur",
    "Guadeloupe",
    "cinéma africain",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    languages: { fr: "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: getSiteUrl(),
    siteName,
    title: titleDefault,
    description,
    images: [
      {
        url: "/images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Agora Film Invest — cinéma et production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/images/hero-main.jpg"],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

function getJsonLd() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: siteName,
        url: base,
        description,
        areaServed: ["GP", "MQ", "FR", "SN", "EU"],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: siteName,
        description,
        inLanguage: "fr-FR",
        publisher: { "@id": `${base}/#organization` },
      },
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="w-full max-w-full overflow-x-hidden">
      <body className={`w-full max-w-full overflow-x-hidden antialiased ${raleway.className}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
