import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AREA_KEYWORDS, jsonLd, langAlts, SITE_URL } from "@/lib/seo";
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

const title = "Décorations de Mariage Montréal";
const description =
  "Louez ou achetez le décor de mariage au Grand Montréal. Arches, voilages, chandelles, faveurs et enseignes, avec livraison et installation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s",
  },
  description,
  keywords: AREA_KEYWORDS,
  authors: [{ name: "Montreal Wedding Decorations", url: SITE_URL }],
  creator: "Montreal Wedding Decorations",
  alternates: {
    canonical: "/",
    languages: langAlts("/en", "/"),
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: SITE_URL,
    siteName: "Montreal Wedding Decorations",
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    images: [
      {
        url: "/images/hero.jpg",
        width: 3456,
        height: 2304,
        alt: "Ivory floral wedding arch and candlelit table in Montréal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  const consent = (await cookies()).get("jm-consent")?.value;
  const consentSet = consent === "essential" || consent === "all";
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-ivory font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers initialLocale={locale} consentSet={consentSet}>{children}</Providers>
      </body>
    </html>
  );
}
