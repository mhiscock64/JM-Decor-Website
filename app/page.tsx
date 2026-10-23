import type { Metadata } from "next";
import { headers } from "next/headers";
import { HomePage } from "@/components/home-page";
import { langAlts } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  if (fr) {
    return {
      title: {
        absolute: "Décor de mariage au Grand Montréal | JM Decor",
      },
      description:
        "Louez ou achetez le décor de mariage au Grand Montréal : arches, voilages et chandelles, ou faveurs et enseignes. Livraison et installation.",
      alternates: {
        canonical: "/fr",
        languages: langAlts("/", "/fr"),
      },
      openGraph: {
        title: "Décor de mariage au Grand Montréal | JM Decor",
        description:
          "Location ou achat d'arches, de voilages et de chandelles. Livraison et installation à Montréal, Laval, sur la Rive-Sud et dans l'Ouest-de-l'Île.",
        url: "/fr",
        locale: "fr_CA",
      },
    };
  }
  return {
    alternates: {
      canonical: "/",
      languages: langAlts("/", "/fr"),
    },
  };
}

export default function Page() {
  return <HomePage />;
}
