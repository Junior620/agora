/** Domaine public du site (agorafilminvest.com redirige vers www). */
const PRODUCTION_URL = "https://www.agorafilminvest.com";

/**
 * URL canonique du site (SEO, Open Graph, sitemap).
 * - NEXT_PUBLIC_SITE_URL si elle est définie ;
 * - en production Vercel : le domaine public. Surtout pas VERCEL_URL, qui est l'adresse
 *   du déploiement (*.vercel.app) protégée par connexion : Facebook, WhatsApp ou Google
 *   y tombent sur une page de login et n'affichent pas l'image de partage ;
 * - en préversion Vercel : l'adresse du déploiement ;
 * - en local : http://localhost:3000.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
