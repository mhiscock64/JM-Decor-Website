import type { Metadata } from "next";
import { headers } from "next/headers";
import { GalleryPage } from "@/components/gallery-page";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Galerie de décor de mariage",
        description:
          "Décorations de mariage récentes par JM Decor à Montréal : cérémonies de jardin, salles aux chandelles, réceptions du Vieux-Montréal et showers.",
        alternates: { canonical: "/fr/gallery", languages: { "en-CA": "/gallery", "fr-CA": "/fr/gallery" } },
        openGraph: { title: "Galerie décor de mariage · JM Decor Montréal", url: "/fr/gallery", locale: "fr_CA" },
      }
    : {
        title: "Wedding décor gallery",
        description:
          "Recent wedding decorations by JM Decor in Montréal: garden ceremonies, candlelit ballrooms, Vieux-Montréal receptions, and bridal showers.",
        alternates: { canonical: "/gallery", languages: { "en-CA": "/gallery", "fr-CA": "/fr/gallery" } },
        openGraph: {
          title: "Wedding décor gallery · JM Decor Montréal",
          description: "Garden ceremonies, candlelit ballrooms, and bridal shower decorations styled across Greater Montréal.",
          url: "/gallery",
        },
      };
}

export default function Page() {
  return <GalleryPage />;
}
