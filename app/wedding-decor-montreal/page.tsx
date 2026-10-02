import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { AREA_KEYWORDS, SITE_URL } from "@/lib/seo";

const title = "Wedding décor & decorations in Greater Montréal";
const description =
  "JM Decor rents and sells wedding décor across Greater Montréal: ceremony arches, drapery, candlelight, table decorations, welcome signs, and favors. Delivery and setup in Montréal, Laval, the South Shore, and the West Island.";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  if (fr) {
    return {
      title: "Décoration de mariage au Grand Montréal",
      description:
        "Location et vente de décoration de mariage au Grand Montréal : arches, voilages, chandelles, décor de table et faveurs. Livraison à Montréal, Laval, Longueuil, Brossard et dans l'Ouest-de-l'Île.",
      keywords: AREA_KEYWORDS,
      alternates: {
        canonical: "/fr/wedding-decor-montreal",
        languages: { "en-CA": "/wedding-decor-montreal", "fr-CA": "/fr/wedding-decor-montreal" },
      },
      openGraph: {
        title: "Décoration de mariage au Grand Montréal · JM Decor",
        url: "/fr/wedding-decor-montreal",
        locale: "fr_CA",
      },
    };
  }
  return {
    title,
    description,
    keywords: AREA_KEYWORDS,
    alternates: {
      canonical: "/wedding-decor-montreal",
      languages: { "en-CA": "/wedding-decor-montreal", "fr-CA": "/fr/wedding-decor-montreal" },
    },
    openGraph: {
      title: `${title} · JM Decor`,
      description,
      url: "/wedding-decor-montreal",
      locale: "en_CA",
      alternateLocale: ["fr_CA"],
    },
  };
}

const areas = [
  ["Montréal & Vieux-Montréal", "Lofts, museums, and Old Port rooms. Arches and drapery sized for tight ceremony floors."],
  ["Laval", "Garden ceremonies and banquet halls north of the island, with delivery and setup in the quote."],
  ["Longueuil, Brossard & the South Shore", "Rive-Sud receptions in Saint-Lambert, Boucherville, and Brossard."],
  ["West Island", "Pointe-Claire, Dorval, Beaconsfield, and Kirkland venues that need a full rented look."],
  ["Westmount, Outremont, Plateau", "Townhouses and smaller rooms where candlelight and a single arch do the work."],
];

export default function Page() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding décor and decorations in Greater Montréal",
    serviceType: "Wedding decoration rental and sales",
    url: `${SITE_URL}/wedding-decor-montreal`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: ["Montréal", "Laval", "Longueuil", "Brossard", "West Island", "South Shore"],
    availableLanguage: ["en", "fr"],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">
        Greater Montréal · Grand Montréal
      </p>
      <h1 className="mt-4 font-display text-5xl font-medium text-balance">
        Wedding décor and decorations for Greater Montréal
      </h1>
      <p className="mt-6 font-body text-[16px] leading-relaxed text-ink/70">
        JM Decor dresses weddings on the island and across the greater area. Rent a ceremony arch,
        drapery wall, or candlelit table look for the weekend, or buy the signs, card boxes, and
        favors you want to keep. There is no checkout on the site: build a list and request a quote
        with delivery and setup for your venue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className="bg-ink px-4 py-2 font-body text-[13px] font-medium text-ivory">
          Browse the catalogue
        </Link>
        <Link href="/quote" className="px-4 py-2 font-body text-[13px] font-medium text-ink ring-1 ring-ink/15">
          Request a quote
        </Link>
      </div>

      <h2 className="mt-16 font-display text-3xl font-medium">What couples rent and buy</h2>
      <ul className="mt-6 space-y-4 font-body text-[15px] leading-relaxed text-ink/70">
        <li>
          <strong className="text-ink">Ceremony arches and backdrops.</strong> Freestanding floral
          arches, sheer drapery walls, and white backdrops for garden ceremonies, lofts, and ballrooms.
        </li>
        <li>
          <strong className="text-ink">Candlelight and table décor.</strong> Brass holders, lanterns,
          blush runners, glass vases, and silk rose arrangements.
        </li>
        <li>
          <strong className="text-ink">Signs, card boxes, and favors.</strong> Acrylic welcome signs,
          illuminated card boxes, keychains, mini vases, and candle molds guests can take home.
        </li>
        <li>
          <strong className="text-ink">Bridal shower decorations.</strong> The same pieces scale down
          for showers and welcome dinners in Montréal.
        </li>
      </ul>

      <h2 className="mt-16 font-display text-3xl font-medium">Where we deliver and set up</h2>
      <div className="mt-6 space-y-5">
        {areas.map(([name, body]) => (
          <section key={name}>
            <h3 className="font-body text-[16px] font-medium text-ink">{name}</h3>
            <p className="mt-1 font-body text-[15px] leading-relaxed text-ink/70">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-16 font-display text-3xl font-medium">Décoration de mariage au Grand Montréal</h2>
      <p className="mt-4 font-body text-[15px] leading-relaxed text-ink/70">
        JM Decor livre et installe le décor de mariage à Montréal, à Laval, sur la Rive-Sud
        (Longueuil, Brossard, Saint-Lambert, Boucherville) et dans l'Ouest-de-l'Île.
        Location d'arches de cérémonie, de voilages et de chandelles, ou achat d'enseignes,
        de boîtes à cartes et de faveurs. Pas de paiement en ligne : demandez une soumission et nous
        confirmons les pièces, la livraison et l'installation.
      </p>
      <p className="mt-4 font-body text-[15px] leading-relaxed text-ink/70">
        <Link href="/fr" className="text-sage underline-offset-4 hover:underline">
          Voir le site en français
        </Link>
      </p>
    </article>
  );
}
