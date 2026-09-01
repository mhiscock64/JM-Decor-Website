import type { Metadata } from "next";
import { ShopPage } from "@/components/shop-page";

export const metadata: Metadata = {
  title: "Shop & rental",
  description:
    "Rent a full look for the weekend or purchase the pieces you will keep. Delivery and setup across the island of Montréal.",
};

export default function Page() {
  return <ShopPage />;
}
