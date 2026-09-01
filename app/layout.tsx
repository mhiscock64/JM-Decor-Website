import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: {
    default: "JM Decor · Wedding Décor in Montréal",
    template: "%s · JM Decor",
  },
  description:
    "Arches, candlelight and drapery for Montréal weddings. Rent a full look or purchase the pieces you keep. Request a free quote.",
  openGraph: {
    title: "JM Decor · Wedding Décor in Montréal",
    description:
      "Arches, candlelight and drapery for Montréal weddings. Rent or purchase. Request a free quote.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-ivory font-body text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
