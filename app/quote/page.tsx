import type { Metadata } from "next";
import { headers } from "next/headers";
import { QuoteForm } from "@/components/quote-form";
import { langAlts } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Demander une soumission de décor",
        description:
          "Soumission de décor de mariage au Grand Montréal. Location ou achat, avec livraison et installation. Aucun paiement sur le site.",
        alternates: { canonical: "/quote", languages: langAlts("/en/quote", "/quote") },
        openGraph: { title: "Soumission de décor de mariage", url: "/quote", locale: "fr_CA" },
      }
    : {
        title: "Request a wedding décor quote",
        description:
          "Request a wedding décor quote in Greater Montréal. Rent or buy, with delivery and setup priced for your venue. No payment on the site.",
        alternates: { canonical: "/en/quote", languages: langAlts("/en/quote", "/quote") },
        openGraph: {
          title: "Request a wedding décor quote",
          description: "Tell us about your Montréal, Laval, South Shore, or West Island wedding. We reply with a tailored décor quote.",
          url: "/en/quote",
          locale: "en_CA",
        },
      };
}

export default function Page() {
  return <QuoteForm />;
}
