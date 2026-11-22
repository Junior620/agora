import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getMetadataBase, getSiteUrl } from "@/lib/site";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
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
  /* Favicon / Apple : app/favicon.ico, app/icon.png et app/apple-icon.png (npm run brand:assets). */
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
    /* Image : générée par app/opengraph-image.tsx (1200×630). */
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    /* Image : générée par app/twitter-image.tsx. */
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
        logo: `${base}/logo/logo.png`,
        telephone: "+33778214874",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12 rue de la République, Domly",
          postalCode: "97110",
          addressLocality: "Pointe-à-Pitre",
          addressRegion: "Guadeloupe",
          addressCountry: "FR",
        },
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
    <html lang="fr" className={`w-full max-w-full overflow-x-hidden ${raleway.variable}`}>
      <body className={`w-full max-w-full overflow-x-hidden font-sans antialiased ${raleway.className}`}>
        <a
          href="#contenu"
          className="sr-only z-[100] rounded-full bg-black px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
