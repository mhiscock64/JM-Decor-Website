import type {
  Locale,
  Localized,
  Product,
  ProductVariant,
  VariantType,
} from "@/lib/types";

const VENUE_PRODUCTS: Product[] = [
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
    name: {
      en: "Vintage Brass Gold Candle Holders",
      fr: "Bougeoirs vintage laiton or",
    },
    image: "/images/vintage-brass-gold-candle-holders.jpg",
    variants: [
      {
        type: "rental",
        price: 45,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Vintage brass-gold taper holders · 2-week min",
          fr: "Bougeoirs vintage laiton or · min. 2 semaines",
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
  {
    id: "pink-table-runner",
    name: { en: "Pink Table Runner", fr: "Chemin de table rose" },
    image: "/images/pink-table-runner.jpg",
    variants: [
      {
        type: "rental",
        price: 35,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Sheer blush runner with pearl detail · rental",
          fr: "Chemin de table blush perlé · location",
        },
      },
    ],
  },
  {
    id: "white-lantern",
    name: { en: "White Lantern", fr: "Lanterne blanche" },
    image: "/images/white-lantern.jpg",
    variants: [
      {
        type: "rental",
        price: 25,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "White-washed open wooden lantern · 2-week min",
          fr: "Lanterne en bois blanchi · min. 2 semaines",
        },
      },
    ],
  },
  {
    id: "brown-lantern",
    name: { en: "Brown Lantern", fr: "Lanterne brune" },
    image: "/images/brown-lantern.jpg",
    variants: [
      {
        type: "rental",
        price: 25,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Dark wood open lantern frame · 2-week min",
          fr: "Lanterne en bois foncé · min. 2 semaines",
        },
      },
    ],
  },
  {
    id: "white-backdrop",
    name: { en: "White Backdrop", fr: "Toile de fond blanche" },
    image: "/images/white-backdrop.jpg",
    variants: [
      {
        type: "rental",
        price: 130,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Sheer white backdrop panels · rental",
          fr: "Panneaux de toile de fond blancs · location",
        },
      },
    ],
  },
  {
    id: "white-arch-draping-fabric",
    name: {
      en: "White Arch Draping Fabric",
      fr: "Voilage d'arche blanc",
    },
    image: "/images/white-arch-draping.jpg",
    variants: [
      {
        type: "rental",
        price: 90,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Sheer white fabric for arches and columns · rental",
          fr: "Voilage blanc pour arches et colonnes · location",
        },
      },
    ],
  },
  {
    id: "glass-vases",
    name: { en: "Glass Vases", fr: "Vases en verre" },
    image: "/images/glass-vases.jpg",
    variants: [
      {
        type: "rental",
        price: 18,
        unit: { en: "/ day", fr: "/ jour" },
        description: {
          en: "Clear flared glass vase for table centerpieces · rental",
          fr: "Vase en verre évasé pour centres de table · location",
        },
      },
    ],
  },
];

export const CATEGORIES: { id: string; name: Localized }[] = [
  { id: "venue-decor", name: { en: "Venue Décor", fr: "Décor de salle" } },
  { id: "molds-candles", name: { en: "Molds & Candles", fr: "Moules et chandelles" } },
  { id: "wedding-keychains", name: { en: "Wedding Keychains", fr: "Porte-clés de mariage" } },
  {
    id: "wedding-favors-decor",
    name: { en: "Wedding Favors & Decor", fr: "Cadeaux et décor de mariage" },
  },
];

function buy(
  id: string,
  name: Localized,
  description: Localized,
  price: number,
  category: string,
  tags: string[],
): Product {
  return {
    id,
    name,
    image: `/images/products/${id}.png`,
    category,
    tags,
    variants: [
      {
        type: "purchase",
        price,
        unit: { en: "buy", fr: "achat" },
        description,
      },
    ],
  };
}

const PRINTABLE_PRODUCTS: Product[] = [
  buy(
    "candle-mold-pillar",
    { en: "Classic Pillar Candle Mold", fr: "Moule à chandelle cylindrique" },
    {
      en: "Simple cylinder. Clean, classic, and super easy to print and mold. Split mold for easy removal. Great for beginners.",
      fr: "Cylindre simple. Classique et facile à imprimer. Moule fendu pour le démoulage. Idéal pour débuter.",
    },
    28,
    "molds-candles",
    ["3d-printed", "pla", "beginner", "split-mold"],
  ),
  buy(
    "candle-mold-bubble",
    { en: "Bubble Candle Mold", fr: "Moule à chandelle bulles" },
    {
      en: "Trendy cube with rounded balls. Looks fancy but is simple to print and mold. 2-piece mold.",
      fr: "Cube tendance à bulles. Élégant et simple à imprimer. Moule en 2 pièces.",
    },
    32,
    "molds-candles",
    ["3d-printed", "pla", "beginner", "2-piece-mold"],
  ),
  buy(
    "candle-mold-swirl",
    { en: "Swirl Candle Mold", fr: "Moule à chandelle torsadée" },
    {
      en: "Twisted design that prints well and looks elegant. 2-piece split mold for clean results.",
      fr: "Torsade élégante qui s'imprime bien. Moule fendu en 2 pièces.",
    },
    34,
    "molds-candles",
    ["3d-printed", "pla", "split-mold"],
  ),
  buy(
    "candle-mold-heart",
    { en: "Heart Candle Mold", fr: "Moule à chandelle cœur" },
    {
      en: "Heart shape that is easy to print. Perfect gift or wedding favor. 2-piece mold.",
      fr: "Forme cœur facile à imprimer. Parfait cadeau ou faveur de mariage. Moule en 2 pièces.",
    },
    30,
    "molds-candles",
    ["3d-printed", "pla", "wedding-favor", "2-piece-mold"],
  ),
  buy(
    "wedding-keychain-initials-heart",
    { en: "Initials with Heart Keychain", fr: "Porte-clés initiales et cœur" },
    {
      en: "Simple and elegant initials paired with a center heart.",
      fr: "Initiales élégantes avec un cœur au centre.",
    },
    16,
    "wedding-keychains",
    ["keychain", "initials", "favor"],
  ),
  buy(
    "wedding-keychain-heart-monogram",
    { en: "Heart Monogram Keychain", fr: "Porte-clés monogramme cœur" },
    {
      en: "Classic beaded heart frame with custom monogram initials inside.",
      fr: "Cœur perlé classique avec initiales personnalisées.",
    },
    16,
    "wedding-keychains",
    ["keychain", "monogram", "favor"],
  ),
  buy(
    "wedding-keychain-interlocking-rings",
    { en: "Interlocking Rings Keychain", fr: "Porte-clés alliances entrelacées" },
    {
      en: "Modern and minimal interlocking wedding-band style.",
      fr: "Alliances entrelacées, moderne et minimal.",
    },
    16,
    "wedding-keychains",
    ["keychain", "rings", "favor"],
  ),
  buy(
    "wedding-keychain-mr-mrs",
    { en: "Mr & Mrs Keychain", fr: "Porte-clés Mr & Mrs" },
    {
      en: "Cute script lettering with heart accents.",
      fr: "Lettrage script avec accents de cœur.",
    },
    16,
    "wedding-keychains",
    ["keychain", "script", "favor"],
  ),
  buy(
    "wedding-keychain-date-tag",
    { en: "Custom Date Tag Keychain", fr: "Porte-clés plaque date" },
    {
      en: "Personalized date plaque tag for the wedding day.",
      fr: "Plaque-date personnalisée pour le jour J.",
    },
    16,
    "wedding-keychains",
    ["keychain", "date", "favor"],
  ),
  buy(
    "wedding-keychain-mini-bouquet",
    { en: "Mini Bouquet Keychain", fr: "Porte-clés mini bouquet" },
    {
      en: "Detailed romantic flower bouquet charm.",
      fr: "Breloque bouquet romantique et détaillée.",
    },
    18,
    "wedding-keychains",
    ["keychain", "floral", "favor"],
  ),
  buy(
    "wedding-keychain-dual-culture-heart",
    { en: "Dual Culture Heart Keychain", fr: "Porte-clés cœur double culture" },
    {
      en: "Heart charm with custom country flags — Guyanese and Italian, or your pair.",
      fr: "Cœur aux drapeaux personnalisés — guyane et Italie, ou votre duo.",
    },
    18,
    "wedding-keychains",
    ["keychain", "flags", "custom"],
  ),
  buy(
    "wedding-keychain-simple-heart",
    { en: "Simple Heart Keychain", fr: "Porte-clés cœur simple" },
    {
      en: "Clean 3D sculpted heart design.",
      fr: "Cœur sculpté 3D, ligne claire.",
    },
    14,
    "wedding-keychains",
    ["keychain", "heart", "favor"],
  ),
  buy(
    "wedding-keychain-round-disc",
    { en: "Round Disc Tag Keychain", fr: "Porte-clés médaille ronde" },
    {
      en: "Minimalist round pendant with personalized initials.",
      fr: "Médaille ronde minimaliste aux initiales personnalisées.",
    },
    14,
    "wedding-keychains",
    ["keychain", "initials", "favor"],
  ),
  buy(
    "wedding-keychain-butterfly",
    { en: "Butterfly Keychain", fr: "Porte-clés papillon" },
    {
      en: "Pretty 3D textured butterfly design.",
      fr: "Papillon 3D texturé.",
    },
    16,
    "wedding-keychains",
    ["keychain", "butterfly", "favor"],
  ),
  buy(
    "wedding-keychain-vertical-love",
    { en: 'Vertical "LOVE" Keychain', fr: "Porte-clés LOVE vertical" },
    {
      en: "Simple, trendy vertical letter charm.",
      fr: "Breloque lettres verticales, simple et tendance.",
    },
    14,
    "wedding-keychains",
    ["keychain", "love", "favor"],
  ),
  buy(
    "wedding-keychain-thank-you",
    { en: '"Thank You" Favor Tag Keychain', fr: 'Porte-clés « Thank You »' },
    {
      en: "Scalloped-edge tag for guest appreciation favors.",
      fr: "Étiquette festonnée pour remercier les invités.",
    },
    14,
    "wedding-keychains",
    ["keychain", "thank-you", "favor"],
  ),
  buy(
    "wedding-keychain-bride-groom",
    { en: "Bride & Groom Silhouette Keychain", fr: "Porte-clés silhouettes mariés" },
    {
      en: "Classic silhouette outline of bride and groom.",
      fr: "Silhouettes classiques des mariés.",
    },
    16,
    "wedding-keychains",
    ["keychain", "silhouette", "favor"],
  ),
  buy(
    "wedding-keychain-scallop-shell",
    { en: "Scallop Shell Keychain", fr: "Porte-clés coquille Saint-Jacques" },
    {
      en: "Coastal shell charm with a pearl accent.",
      fr: "Coquille côtière avec accent de perle.",
    },
    16,
    "wedding-keychains",
    ["keychain", "shell", "beach"],
  ),
  buy(
    "wedding-keychain-floral-monogram",
    { en: "Floral Monogram Keychain", fr: "Porte-clés monogramme floral" },
    {
      en: "Feminine initials wrapped in floral motifs.",
      fr: "Initiales habillées de motifs floraux.",
    },
    18,
    "wedding-keychains",
    ["keychain", "floral", "monogram"],
  ),
  buy(
    "wedding-keychain-pearl-bow-heart",
    { en: "Pearl Bow Heart Keychain", fr: "Porte-clés cœur perlé et nœud" },
    {
      en: "Elegant beaded heart with a bow at the top.",
      fr: "Cœur perlé élégant surmonté d'un nœud.",
    },
    18,
    "wedding-keychains",
    ["keychain", "pearl", "bow"],
  ),
  buy(
    "wedding-keychain-heart-date",
    { en: "Heart Date Tag Keychain", fr: "Porte-clés date et cœurs" },
    {
      en: "Timeless round pendant with interlocking hearts and date.",
      fr: "Médaille ronde avec cœurs entrelacés et date.",
    },
    16,
    "wedding-keychains",
    ["keychain", "date", "heart"],
  ),
  buy(
    "wedding-favor-mini-candle-holders",
    { en: "Mini Candle Holders", fr: "Mini bougeoirs" },
    {
      en: "Heart, flower, or bubble style holders for tea lights.",
      fr: "Bougeoirs cœur, fleur ou bulles pour chauffe-plats.",
    },
    22,
    "wedding-favors-decor",
    ["favor", "tealight", "decor"],
  ),
  buy(
    "wedding-favor-mini-flower-vases",
    { en: "Mini Flower Vases", fr: "Mini vases" },
    {
      en: "Sculpted miniature vases with optional initials or date.",
      fr: "Mini vases sculptés, initiales ou date en option.",
    },
    20,
    "wedding-favors-decor",
    ["favor", "vase", "custom"],
  ),
  buy(
    "wedding-favor-ring-dishes",
    { en: "Ring Dishes", fr: "Coupelles à bagues" },
    {
      en: "Heart or scallop trinket trays for rings and jewelry.",
      fr: "Coupelles cœur ou coquille pour bagues et bijoux.",
    },
    18,
    "wedding-favors-decor",
    ["favor", "jewelry", "dish"],
  ),
  buy(
    "wedding-favor-butterfly-decorations",
    { en: "Butterfly Decorations", fr: "Papillons décoratifs" },
    {
      en: "3D butterfly ornaments or magnets.",
      fr: "Papillons 3D en ornement ou aimant.",
    },
    14,
    "wedding-favors-decor",
    ["favor", "butterfly", "magnet"],
  ),
  buy(
    "wedding-favor-pearl-trinket-dishes",
    { en: "Pearl Trinket Dishes", fr: "Coupelles perlées" },
    {
      en: "Round or heart dishes with a raised pearl border.",
      fr: "Coupelles rondes ou cœur à bordure perlée.",
    },
    18,
    "wedding-favors-decor",
    ["favor", "pearl", "dish"],
  ),
  buy(
    "wedding-favor-wine-charms",
    { en: "Wine / Champagne Charms", fr: "Marque-verres" },
    {
      en: "Mini ring and bow charms for stemware.",
      fr: "Breloques anneau et nœud pour verres à pied.",
    },
    16,
    "wedding-favors-decor",
    ["favor", "stemware"],
  ),
  buy(
    "wedding-favor-bottle-stoppers",
    { en: "Custom Bottle Stoppers", fr: "Bouchons personnalisés" },
    {
      en: "Heart, initials, or flower tops on wine stoppers.",
      fr: "Bouchons de vin à cœur, initiales ou fleur.",
    },
    22,
    "wedding-favors-decor",
    ["favor", "wine", "custom"],
  ),
  buy(
    "wedding-favor-place-card-holders",
    { en: "Place-Card Holders", fr: "Porte-noms" },
    {
      en: "Table-number or guest-card stands in heart and slot styles.",
      fr: "Supports pour nom ou numéro de table, cœur ou fente.",
    },
    16,
    "wedding-favors-decor",
    ["favor", "place-card"],
  ),
  buy(
    "wedding-favor-mini-jewelry-boxes",
    { en: "Mini Jewelry Boxes", fr: "Mini écrins" },
    {
      en: "Small favor boxes with initials or date on the lid.",
      fr: "Petits écrins avec initiales ou date sur le couvercle.",
    },
    24,
    "wedding-favors-decor",
    ["favor", "box", "custom"],
  ),
  buy(
    "wedding-favor-rose-tealight-holders",
    { en: "Rose Tealight Holders", fr: "Bougeoirs rose" },
    {
      en: "Sculpted rose-petal cups for tea lights.",
      fr: "Coupes en pétales de rose pour chauffe-plats.",
    },
    22,
    "wedding-favors-decor",
    ["favor", "rose", "tealight"],
  ),
  buy(
    "wedding-favor-heart-magnets",
    { en: "Heart Magnets", fr: "Aimants cœur" },
    {
      en: "Clean magnetic hearts for the fridge or metal décor.",
      fr: "Cœurs magnétiques pour frigo ou décor métal.",
    },
    12,
    "wedding-favors-decor",
    ["favor", "magnet", "heart"],
  ),
  buy(
    "wedding-favor-mini-flowers",
    { en: "Mini Decorative Flowers", fr: "Mini fleurs décoratives" },
    {
      en: "Standalone sculpted blooms for tables or favors.",
      fr: "Fleurs sculptées pour table ou cadeaux d'invités.",
    },
    14,
    "wedding-favors-decor",
    ["favor", "floral"],
  ),
  buy(
    "wedding-favor-candy-containers",
    { en: "Candy Containers", fr: "Boîtes à dragées" },
    {
      en: "Split-shell containers for sweets or Jordan almonds.",
      fr: "Boîtes à ouverture pour sucreries ou dragées.",
    },
    20,
    "wedding-favors-decor",
    ["favor", "candy"],
  ),
  buy(
    "wedding-favor-mini-ornaments",
    { en: "Mini Wedding Ornaments", fr: "Mini ornements de mariage" },
    {
      en: "Hanging hearts, doves, and rings with optional date tags.",
      fr: "Cœurs, colombes et alliances à suspendre, date en option.",
    },
    16,
    "wedding-favors-decor",
    ["favor", "ornament"],
  ),
];

export const PRODUCTS: Product[] = [...VENUE_PRODUCTS, ...PRINTABLE_PRODUCTS];

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
  {
    src: "/images/gallery-bridal-shower.jpg",
    caption: {
      en: "Bridal Shower Decorations",
      fr: "Décorations de shower de mariée",
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

export function productCategory(product: Product) {
  return product.category ?? "venue-decor";
}

export function categoryLabel(categoryId: string, locale: Locale) {
  return (
    CATEGORIES.find((category) => category.id === categoryId)?.name[locale] ??
    categoryId
  );
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
