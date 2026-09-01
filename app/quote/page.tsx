import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Share your wedding details and JM Decor will send a tailored décor quote with delivery and setup for your Montréal venue.",
};

export default function Page() {
  return <QuoteForm />;
}
