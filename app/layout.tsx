import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { jsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const title = "Wedding Décor & Decorations in Greater Montréal | JM Decor";
const description =
  "Wedding décor and decorations in Greater Montréal. Rent ceremony arches, drapery, and candlelight, or buy favors and signs. Delivery and setup across the island, Laval, the South Shore, and the West Island.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · JM Decor",
  },
  description,
  keywords: [
    "wedding decor Montreal",
    "wedding decorations Montreal",
    "wedding décor Montréal",
    "décoration de mariage Montréal",
    "décor de mariage Grand Montréal",
    "wedding arch rental Montreal",
    "ceremony backdrop Montreal",
    "wedding drapery rental Montreal",
    "candlelight wedding décor",
    "wedding table decorations Montreal",
    "wedding favors Montreal",
    "Laval wedding decor",
    "South Shore wedding decorations",
    "Rive-Sud décor de mariage",
    "West Island wedding décor",
    "Vieux-Montréal wedding decorations",
  ],
  authors: [{ name: "JM Decor", url: SITE_URL }],
  creator: "JM Decor",
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", "fr-CA": "/" },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: SITE_URL,
    siteName: "JM Decor",
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    images: [
      {
        url: "/images/hero.jpg",
        width: 1440,
        height: 1120,
        alt: "Ivory floral wedding arch and candlelit table by JM Decor in Montréal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Wedding décor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-ivory font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
