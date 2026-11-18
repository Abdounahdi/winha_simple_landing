import type { Metadata, Viewport } from "next";
import { Cairo, Manrope } from "next/font/google";
import "./globals.scss";

// Manrope stands in for the light geometric sans of the Latin subtitle on the
// box. Cairo covers Arabic body copy — it is not the display face of the
// wordmark, which ships as artwork rather than type.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "وينها! — Winha",
  description:
    "Jeu d'observation et de rapidité — 57 symboles tunisiens, une seule règle : shouf, rakkez, w el9aha.",
};

export const viewport: Viewport = {
  themeColor: "#ccecf8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${cairo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
