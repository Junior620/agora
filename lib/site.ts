/**
 * URL canonique du site (SEO, Open Graph, sitemap).
 * Définir NEXT_PUBLIC_SITE_URL en prod (ex. https://www.agorafilminvest.com).
 * Sur Vercel, VERCEL_URL est utilisé en secours.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
