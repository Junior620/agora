import { ImageResponse } from "next/og";

/** Icône onglet : le navigateur l’affiche petit, mais une source 512px = rendu plus net (Retina). */
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#007f59",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            fontSize: 300,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -12,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size },
  );
}
