import type { Metadata } from "next";
import { headers } from "next/headers";
import { GalleryPage } from "@/components/gallery-page";
import { langAlts } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Galerie de décor de mariage",
        description:
          "Décor de mariage récent au Grand Montréal : jardins, salles aux chandelles, Vieux-Montréal et showers. Pièces à louer ou à acheter.",
        alternates: { canonical: "/gallery", languages: langAlts("/en/gallery", "/gallery") },
        openGraph: { title: "Galerie de décor de mariage à Montréal", url: "/gallery", locale: "fr_CA" },
      }
    : {
        title: "Wedding décor gallery",
        description:
          "Recent wedding décor in Greater Montréal: garden ceremonies, candlelit rooms, and bridal showers. Pieces you can rent or buy.",
        alternates: { canonical: "/en/gallery", languages: langAlts("/en/gallery", "/gallery") },
        openGraph: {
          title: "Wedding décor gallery in Montréal",
          description: "Garden ceremonies, candlelit ballrooms, and bridal shower decorations styled across Greater Montréal.",
          url: "/en/gallery",
          locale: "en_CA",
        },
      };
}

export default function Page() {
  return <GalleryPage />;
}
