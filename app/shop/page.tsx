import type { Metadata } from "next";
import { headers } from "next/headers";
import { ShopPage } from "@/components/shop-page";
import { catalogueJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Location et achat de décor de mariage",
        description:
          "Louez ou achetez le décor de mariage au Grand Montréal : arches, voilages, bougeoirs, enseignes et faveurs. Livraison et installation à Montréal, Laval et sur la Rive-Sud.",
        alternates: { canonical: "/fr/shop", languages: { "en-CA": "/shop", "fr-CA": "/fr/shop" } },
        openGraph: {
          title: "Location de décor de mariage à Montréal · JM Decor",
          description: "Arches, voilages, chandelles, enseignes et faveurs. Livraison dans le Grand Montréal.",
          url: "/fr/shop",
          locale: "fr_CA",
        },
      }
    : {
        title: "Wedding décor rentals & decorations",
        description:
          "Rent or buy wedding décor in Greater Montréal: ceremony arches, drapery walls, candle holders, welcome signs, and favors. Delivery and setup on the island, in Laval, and on the South Shore.",
        keywords: [
          "wedding décor rental Montreal",
          "location décor mariage",
          "wedding arch rental Montréal",
          "wedding favors Montreal",
          "décoration de table mariage",
        ],
        alternates: { canonical: "/shop", languages: { "en-CA": "/shop", "fr-CA": "/fr/shop" } },
        openGraph: {
          title: "Wedding décor rentals & decorations in Montréal · JM Decor",
          description: "Ceremony arches, drapery, candlelight, signs, and favors to rent or keep. Delivery across Greater Montréal.",
          url: "/shop",
        },
      };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueJsonLd()) }}
      />
      <ShopPage />
    </>
  );
}
