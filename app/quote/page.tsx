import type { Metadata } from "next";
import { headers } from "next/headers";
import { QuoteForm } from "@/components/quote-form";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Demander une soumission de décor",
        description:
          "Soumission gratuite de décor de mariage pour un lieu du Grand Montréal. Indiquez la date et JM Decor chiffre la livraison et l'installation. Aucun paiement sur le site.",
        alternates: { canonical: "/fr/quote", languages: { "en-CA": "/quote", "fr-CA": "/fr/quote" } },
        openGraph: { title: "Soumission décor de mariage · JM Decor", url: "/fr/quote", locale: "fr_CA" },
      }
    : {
        title: "Request a wedding décor quote",
        description:
          "Request a free wedding décor quote for a Greater Montréal venue. Share your date and JM Decor will price delivery and setup. No payment on the site.",
        alternates: { canonical: "/quote", languages: { "en-CA": "/quote", "fr-CA": "/fr/quote" } },
        openGraph: {
          title: "Request a wedding décor quote · JM Decor",
          description: "Tell us about your Montréal, Laval, South Shore, or West Island wedding. We reply with a tailored décor quote.",
          url: "/quote",
        },
      };
}

export default function Page() {
  return <QuoteForm />;
}
