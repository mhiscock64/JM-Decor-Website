import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A selection of celebrations Atelier Lumière styled across Montréal — from sunlit garden ceremonies to candlelit ballrooms.",
};

export default function Page() {
  return <GalleryPage />;
}
