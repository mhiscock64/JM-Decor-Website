import type { Metadata } from "next";
import { headers } from "next/headers";
import { PlanPage } from "@/components/plan-page";
import { langAlts } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await headers()).get("x-jm-locale") === "fr" ? "fr" : "en";
  if (locale === "fr") {
    return {
      title: "Préparer ma journée",
      description:
        "Préparez le décor de votre mariage au Grand Montréal. Nous proposons des pièces à louer ou à acheter, puis une soumission avec livraison et installation.",
      alternates: { canonical: "/plan", languages: langAlts("/en/plan", "/plan") },
    };
  }
  return {
    title: "Plan my day",
    description:
      "Plan wedding décor in Greater Montréal. We suggest pieces to rent or buy, then you request a quote with delivery and setup.",
    alternates: { canonical: "/en/plan", languages: langAlts("/en/plan", "/plan") },
  };
}

export default function Page() {
  return <PlanPage />;
}
