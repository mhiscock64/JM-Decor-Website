import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "Wedding décor gallery",
  description:
    "Recent wedding decorations by JM Decor in Montréal: garden ceremonies, candlelit ballrooms, Vieux-Montréal receptions, and bridal showers.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Wedding décor gallery · JM Decor Montréal",
    description:
      "Garden ceremonies, candlelit ballrooms, and bridal shower decorations styled across Greater Montréal.",
    url: "/gallery",
  },
};

export default function Page() {
  return <GalleryPage />;
}
