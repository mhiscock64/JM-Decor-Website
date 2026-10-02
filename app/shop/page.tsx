import type { Metadata } from "next";
import { ShopPage } from "@/components/shop-page";

export const metadata: Metadata = {
  title: "Wedding décor rentals & decorations",
  description:
    "Rent or buy wedding décor in Greater Montréal: ceremony arches, drapery walls, candle holders, welcome signs, and favors. Delivery and setup on the island, in Laval, and on the South Shore.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Wedding décor rentals & decorations in Montréal · JM Decor",
    description:
      "Ceremony arches, drapery, candlelight, signs, and favors to rent or keep. Delivery across Greater Montréal.",
    url: "/shop",
  },
};

export default function Page() {
  return <ShopPage />;
}
