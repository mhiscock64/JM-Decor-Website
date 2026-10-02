import type { Metadata } from "next";
import { headers } from "next/headers";
import { HomePage } from "@/components/home-page";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  if (fr) {
    return {
      title: {
        absolute: "Décor et décorations de mariage au Grand Montréal | JM Decor",
      },
      description:
        "Décor et décorations de mariage au Grand Montréal. Location d'arches, de voilages et de chandelles, ou achat de faveurs et d'enseignes. Livraison et installation à Montréal, Laval, sur la Rive-Sud et dans l'Ouest-de-l'Île.",
      alternates: {
        canonical: "/fr",
        languages: { "en-CA": "/", "fr-CA": "/fr" },
      },
      openGraph: {
        title: "Décor et décorations de mariage au Grand Montréal | JM Decor",
        description:
          "Arches de cérémonie, voilages, chandelles et faveurs. Livraison à Montréal, Laval, Longueuil, Brossard et dans l'Ouest-de-l'Île.",
        url: "/fr",
        locale: "fr_CA",
      },
    };
  }
  return {
    alternates: {
      canonical: "/",
      languages: { "en-CA": "/", "fr-CA": "/fr" },
    },
  };
}

export default function Page() {
  return <HomePage />;
}
