import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AREA_KEYWORDS, jsonLd, SITE_URL } from "@/lib/seo";
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
  keywords: AREA_KEYWORDS,
  authors: [{ name: "JM Decor", url: SITE_URL }],
  creator: "JM Decor",
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", "fr-CA": "/fr" },
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = (await headers()).get("x-jm-locale") === "fr" ? "fr" : "en";
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-ivory font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers initialLocale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
