import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Image affichée lors d'un partage du site (Facebook, WhatsApp, LinkedIn, X…). */
export const alt = "Agora Film Invest — production et promotion cinématographique (Caraïbe, Afrique, Europe)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PLUM = "#35203a";
const SAND = "#d8c39d";
const CREAM = "#f5ecdc";

async function dataUri(relativePath: string, mime: string) {
  const file = await readFile(join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [mark, photo] = await Promise.all([
    dataUri("logo/logo-mark-light.png", "image/png"),
    dataUri("images/og-photo.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PLUM }}>
        <div
          style={{
            width: 680,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={220} height={114} alt="" style={{ objectFit: "contain" }} />
          <div
            style={{
              marginTop: 40,
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: 6,
              color: CREAM,
              lineHeight: 1,
            }}
          >
            AGORA
          </div>
          <div style={{ marginTop: 14, fontSize: 30, letterSpacing: 12, color: CREAM }}>FILM INVEST</div>
          <div style={{ marginTop: 40, width: 72, height: 4, background: SAND, borderRadius: 4 }} />
          <div style={{ marginTop: 32, fontSize: 30, fontWeight: 600, color: SAND }}>
            Production · Coproduction · Promotion
          </div>
          <div style={{ marginTop: 12, fontSize: 26, color: "rgba(245, 236, 220, 0.75)" }}>
            Caraïbe · Afrique · Europe · Amériques
          </div>
        </div>
        <div style={{ position: "relative", width: 520, height: "100%", display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={520} height={630} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              background: `linear-gradient(90deg, ${PLUM} 0%, rgba(53, 32, 58, 0) 45%)`,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
