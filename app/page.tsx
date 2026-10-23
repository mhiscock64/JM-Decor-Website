import type { Metadata } from "next";
import { headers } from "next/headers";
import { HomePage } from "@/components/home-page";
import { langAlts } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  if (fr) {
    return {
      title: {
        absolute: "Décorations de Mariage Montréal",
      },
      description:
        "Louez ou achetez le décor de mariage au Grand Montréal : arches, voilages et chandelles, ou faveurs et enseignes. Livraison et installation.",
      alternates: {
        canonical: "/",
        languages: langAlts("/en", "/"),
      },
      openGraph: {
        title: "Décorations de Mariage Montréal",
        description:
          "Location ou achat d'arches, de voilages et de chandelles. Livraison et installation à Montréal, Laval, sur la Rive-Sud et dans l'Ouest-de-l'Île.",
        url: "/",
        locale: "fr_CA",
      },
    };
  }
  return {
    title: { absolute: "Montreal Wedding Decorations | Greater Montréal" },
    description:
      "Rent or buy wedding décor in Greater Montréal. Arches, drapery, candlelight, favors, and signs, with delivery and setup.",
    alternates: {
      canonical: "/en",
      languages: langAlts("/en", "/"),
    },
    openGraph: {
      title: "Montreal Wedding Decorations | Greater Montréal",
      description:
        "Rent or buy wedding décor in Greater Montréal. Arches, drapery, candlelight, favors, and signs, with delivery and setup.",
      url: "/en",
      locale: "en_CA",
    },
  };
}

export default function Page() {
  return <HomePage />;
}
