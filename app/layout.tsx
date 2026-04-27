import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Agora Film Invest",
  description: "Site vitrine Agora Film Invest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="w-full max-w-full overflow-x-hidden">
      <body className={`w-full max-w-full overflow-x-hidden antialiased ${raleway.className}`}>{children}</body>
    </html>
  );
}
