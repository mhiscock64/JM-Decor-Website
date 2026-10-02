import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Request a wedding décor quote",
  description:
    "Request a free wedding décor quote for a Greater Montréal venue. Share your date and JM Decor will price delivery and setup. No payment on the site.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Request a wedding décor quote · JM Decor",
    description:
      "Tell us about your Montréal, Laval, South Shore, or West Island wedding. We reply with a tailored décor quote.",
    url: "/quote",
  },
};

export default function Page() {
  return <QuoteForm />;
}
