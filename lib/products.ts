import type { Locale, Product, ProductVariant, VariantType } from "@/lib/types";

export const PRODUCTS: Product[] = [
  {
    id: "ivory-bloom-arch",
    name: { en: "Ivory Bloom Arch", fr: "Arche Ivory Bloom" },
    image: "/images/product-arch.jpg",
    variants: [
      {
        type: "rental",
        price: 180,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "7-ft freestanding, 2-week minimum",
          fr: "Autoportante 7 pi, minimum 2 semaines",
        },
      },
    ],
  },
  {
    id: "brass-candle-trio",
    name: { en: "Brass Candle Trio", fr: "Trio de chandeliers en laiton" },
    image: "/images/product-candles.jpg",
    variants: [
      {
        type: "purchase",
        price: 95,
        unit: { en: "buy", fr: "achat" },
        description: {
          en: "Set of 3 · yours to keep",
          fr: "Ensemble de 3 · à conserver",
        },
      },
    ],
  },
  {
    id: "sheer-drapery-wall",
    name: { en: "Sheer Drapery Wall", fr: "Mur de voilage" },
    image: "/images/product-drapery.jpg",
    variants: [
      {
        type: "rental",
        price: 120,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "12-ft panel, clips included",
          fr: "Panneau 12 pi, pinces incluses",
        },
      },
    ],
  },
  {
    id: "acrylic-welcome-sign",
    name: { en: "Acrylic Welcome Sign", fr: "Panneau de bienvenue en acrylique" },
    image: "/images/product-sign.jpg",
    variants: [
      {
        type: "purchase",
        price: 65,
        unit: { en: "buy", fr: "achat" },
        description: {
          en: "Custom names · engraved",
          fr: "Noms personnalisés · gravé",
        },
      },
    ],
  },
  {
    id: "illuminated-card-box",
    name: { en: "Illuminated Card Box", fr: "Boîte à cartes lumineuse" },
    image: "/images/product-cardbox.jpg",
    variants: [
      {
        type: "rental",
        price: 75,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Glowing LED card box · 2-week minimum",
          fr: "Boîte LED lumineuse · minimum 2 semaines",
        },
      },
      {
        type: "purchase",
        price: 210,
        unit: { en: "buy", fr: "achat" },
        description: {
          en: "Glowing LED card box · yours to keep",
          fr: "Boîte LED lumineuse · à conserver",
        },
      },
    ],
  },
  {
    id: "garden-rose-arrangement",
    name: { en: "Garden Rose Arrangement", fr: "Composition jardin de roses" },
    image: "/images/floral-garden.png",
    variants: [
      {
        type: "rental",
        price: 140,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "White roses & hydrangea · silk",
          fr: "Roses blanches et hortensias · soie",
        },
      },
    ],
  },
  {
    id: "crystal-cascade-arrangement",
    name: {
      en: "Crystal Cascade Arrangement",
      fr: "Composition cascade de cristaux",
    },
    image: "/images/floral-crystal.png",
    variants: [
      {
        type: "rental",
        price: 165,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Roses & trailing crystal beads · silk",
          fr: "Roses et perles de cristal · soie",
        },
      },
    ],
  },
  {
    id: "acrylic-pedestal-stand",
    name: { en: "Acrylic Pedestal Stand", fr: "Piédestal en acrylique" },
    image: "/images/acrylic-pedestal.png",
    variants: [
      {
        type: "rental",
        price: 55,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Clear 4-pillar pedestal · 2-week min",
          fr: "Piédestal 4 piliers transparent · min. 2 semaines",
        },
      },
    ],
  },
  {
    id: "rose-gold-crystal-stand",
    name: {
      en: "Rose Gold Crystal Stand",
      fr: "Support cristal or rose",
    },
    image: "/images/rose-gold-stand.png",
    variants: [
      {
        type: "rental",
        price: 70,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Crystal-draped rose gold stand · 2-week min",
          fr: "Support or rose drapé de cristaux · min. 2 semaines",
        },
      },
    ],
  },
];

export const GALLERY = [
  {
    src: "/images/gallery-1.jpg",
    caption: { en: "Bordeaux garden · 120 guests", fr: "Jardin Bordeaux · 120 invités" },
  },
  {
    src: "/images/gallery-2.jpg",
    caption: {
      en: "Hilton Bonaventure · evening",
      fr: "Hilton Bonaventure · soirée",
    },
  },
  {
    src: "/images/gallery-3.jpg",
    caption: {
      en: "Musée d'art · contemporary",
      fr: "Musée d'art · contemporain",
    },
  },
] as const;

export const HERO = {
  src: "/images/hero.jpg",
  alt: {
    en: "Sunlit wedding table with ivory floral arch and candlelight",
    fr: "Table de mariage ensoleillée avec arche florale ivoire et chandelles",
  },
};

export function lineId(productId: string, type: VariantType) {
  return `${productId}--${type}`;
}

export function localizeVariant(product: Product, variant: ProductVariant, locale: Locale) {
  return {
    id: lineId(product.id, variant.type),
    productId: product.id,
    name: product.name[locale],
    image: product.image,
    type: variant.type,
    price: variant.price,
    unit: variant.unit[locale],
    description: variant.description[locale],
  };
}

export function findProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function displayLine(
  line: { productId: string; name: string; type: VariantType; unit: string },
  locale: Locale,
) {
  const product = findProduct(line.productId);
  const variant = product?.variants.find((item) => item.type === line.type);
  return {
    name: product?.name[locale] ?? line.name,
    unit: variant?.unit[locale] ?? line.unit,
    typeLabel:
      line.type === "rental"
        ? locale === "fr"
          ? "location"
          : "rental"
        : locale === "fr"
          ? "achat"
          : "purchase",
  };
}

export function formatCad(amount: number) {
  return `$${amount.toLocaleString("en-CA")}`;
}
