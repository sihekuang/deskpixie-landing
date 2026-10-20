import type { Metadata, Viewport } from "next";
import { Geist_Pixel, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pixel = Geist_Pixel({
  variable: "--font-pixel",
  subsets: ["latin"],
  axes: ["ELSH"],
});

export const metadata: Metadata = {
  title: "DeskPixie: a desktop voice pixie for your coding agents",
  description:
    "Talk to Pixie out loud. It hands real work to a Claude Code or Codex agent, keeps an eye on your sessions, and tells you when they're done. Free for macOS.",
  openGraph: {
    title: "DeskPixie",
    description: "Say it out loud. Pixie handles the rest.",
    images: ["/icon-1024.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#141a33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${pixel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
