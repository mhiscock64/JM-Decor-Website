import { PRODUCTS } from "@/lib/products";

export const SITE_URL = "https://www.montrealweddingdecorations.com";

export function langAlts(en: string, fr: string) {
  return { "en-CA": en, "fr-CA": fr, "x-default": en };
}

export const AREA_KEYWORDS = [
  "wedding decor Montreal",
  "wedding decorations Montreal",
  "wedding décor Montréal",
  "décoration de mariage Montréal",
  "décor de mariage Grand Montréal",
  "location décor mariage Montréal",
  "wedding arch rental Montreal",
  "arche de mariage Montréal",
  "ceremony backdrop Montreal",
  "wedding drapery rental Montreal",
  "candlelight wedding décor",
  "wedding table decorations Montreal",
  "wedding favors Montreal",
  "faveurs de mariage Montréal",
  "Laval wedding decor",
  "décoration mariage Laval",
  "South Shore wedding decorations",
  "décor mariage Rive-Sud",
  "Longueuil wedding décor",
  "Brossard wedding decorations",
  "West Island wedding décor",
  "décor mariage Ouest-de-l'Île",
  "Vieux-Montréal wedding decorations",
  "bridal shower decorations Montreal",
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Montreal Wedding Decorations",
      alternateName: "Décorations de Mariage Montréal",
      url: SITE_URL,
      image: `${SITE_URL}/images/hero.jpg`,
      logo: `${SITE_URL}/images/logo-en.png`,
      email: "bonjour@montrealweddingdecorations.com",
      description:
        "Wedding décor and decorations for Greater Montréal. Ceremony arches, drapery walls, candlelight, welcome signs, and favors, available to rent or purchase, with delivery and setup.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      areaServed: [
        "Montréal",
        "Laval",
        "Longueuil",
        "Brossard",
        "Boucherville",
        "Saint-Lambert",
        "Westmount",
        "Outremont",
        "West Island",
        "South Shore",
        "Vieux-Montréal",
      ].map((name) => ({ "@type": "Place", name })),
      knowsLanguage: ["en", "fr"],
      priceRange: "$$",
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding décor rental in Greater Montréal" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding decoration sales" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding décor delivery and setup" },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you deliver wedding décor in Greater Montréal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We deliver and set up wedding décor across the island of Montréal, Laval, the South Shore including Longueuil and Brossard, and the West Island.",
          },
        },
        {
          "@type": "Question",
          name: "Can I rent a wedding arch or backdrop in Montréal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Ceremony arches, drapery walls, candle holders, and floral arrangements are available to rent. Many rentals have a two-week minimum.",
          },
        },
        {
          "@type": "Question",
          name: "Can I buy wedding decorations to keep?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Welcome signs, illuminated card boxes, favors, keychains, and candle molds can be purchased.",
          },
        },
        {
          "@type": "Question",
          name: "Is there online checkout?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Build a list and request a quote. We reply with delivery and setup for your venue. There is no payment on the site.",
          },
        },
      ],
    },
  ],
};

export function catalogueJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Montreal Wedding Decorations catalogue",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/shop#${product.id}`,
      item: {
        "@type": "Product",
        name: product.name.en,
        alternateName: product.name.fr,
        image: `${SITE_URL}${product.image}`,
        description: product.variants[0]?.description.en,
        brand: { "@type": "Brand", name: "Montreal Wedding Decorations" },
        category: "Wedding décor",
        offers: product.variants.map((variant) => ({
          "@type": "Offer",
          priceCurrency: "CAD",
          price: variant.price,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/quote`,
          description:
            variant.type === "rental"
              ? "Rental price. Request a quote for delivery and setup. No online checkout."
              : "Purchase price. Request a quote. No online checkout.",
          businessFunction:
            variant.type === "rental"
              ? "http://purl.org/goodrelations/v1#LeaseOut"
              : "http://purl.org/goodrelations/v1#Sell",
        })),
      },
    })),
  };
}
