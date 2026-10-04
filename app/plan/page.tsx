import type { Metadata } from "next";
import { headers } from "next/headers";
import { PlanPage } from "@/components/plan-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await headers()).get("x-jm-locale") === "fr" ? "fr" : "en";
  if (locale === "fr") {
    return {
      title: "Préparer ma journée",
      description: "Quelques questions sur votre mariage à Montréal et JM Decor propose un décor du catalogue. Demandez ensuite une soumission. Aucun paiement.",
      alternates: { canonical: "/fr/plan", languages: { "en-CA": "/plan", "fr-CA": "/fr/plan" } },
    };
  }
  return {
    title: "Plan my day",
    description: "Answer a few questions about your Montréal wedding and JM Decor will suggest décor from the catalogue — then request a quote. No payment.",
    alternates: { canonical: "/plan", languages: { "en-CA": "/plan", "fr-CA": "/fr/plan" } },
  };
}

export default function Page() {
  return <PlanPage />;
}
