import type { Metadata, Viewport } from "next";
import { Geist_Pixel, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // The same card as the GitHub repo's social preview (deskpixie docs/images/social-preview.png),
    // so a link to either looks the same in messages.
    images: [{ url: "/social-preview.png", width: 1280, height: 640, alt: "Pixie, and DeskPixie: a voice layer on top of your coding agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/social-preview.png"],
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#141a33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${pixel.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
