import type { Localized } from "@/lib/types";
import { INSPIRATION, type InspirationCategory } from "@/lib/inspiration";

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  category: InspirationCategory;
  alt: Localized;
  caption: Localized;
};

// Tags reused from the homepage inspiration wall where a photo is already tagged there.
const inspirationCategory = new Map(INSPIRATION.flat().map((item) => [item.src, item.category]));

function photo(item: Omit<GalleryPhoto, "category"> & { category?: InspirationCategory }): GalleryPhoto {
  return { ...item, category: inspirationCategory.get(item.src) ?? item.category ?? "reception" };
}

export const GALLERY_HERO = {
  src: "/images/gallery-evening-drape.jpg",
  width: 2304,
  height: 3456,
  alt: {
    en: "White drapery and string lights over a candlelit evening reception table",
    fr: "Voilages blancs et guirlandes lumineuses au-dessus d'une table de réception aux chandelles, en soirée",
  },
} as const;

// Captions describe what is visible in each photo (no venue, client or guest-count claims).
// Order chosen so the 2, 3 and 4 CSS columns end as close to level as nine photos allow
// (the three 4:5 photos share one desktop column).
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  photo({
    src: "/images/gallery-candelabra.jpg",
    width: 768,
    height: 1152,
    caption: { en: "Brass candelabra reception", fr: "Réception au candélabre de laiton" },
    alt: {
      en: "Reception table set with brass candelabras and white candles",
      fr: "Table de réception dressée avec candélabres de laiton et chandelles blanches",
    },
  }),
  photo({
    src: "/images/gallery-garden-lanterns.jpg",
    width: 768,
    height: 1152,
    caption: { en: "Garden roses and lanterns", fr: "Roses de jardin et lanternes" },
    alt: {
      en: "Garden rose centrepiece surrounded by lit lanterns",
      fr: "Centre de table de roses de jardin entouré de lanternes allumées",
    },
  }),
  photo({
    src: "/images/gallery-1.jpg",
    width: 1024,
    height: 1280,
    caption: { en: "Garden ceremony aisle under drapery", fr: "Allée de cérémonie au jardin sous voilages" },
    alt: {
      en: "Outdoor ceremony aisle under white drapery and a chandelier",
      fr: "Allée de cérémonie en plein air sous voilages blancs et lustre",
    },
  }),
  photo({
    src: "/images/gallery-2.jpg",
    width: 1024,
    height: 1280,
    caption: { en: "Candlelit head table and white flowers", fr: "Table d'honneur aux chandelles et fleurs blanches" },
    alt: {
      en: "Reception room with a long candlelit table, white flowers and greenery",
      fr: "Salle de réception avec longue table aux chandelles, fleurs blanches et verdure",
    },
  }),
  photo({
    src: "/images/gallery-3.jpg",
    width: 1024,
    height: 1280,
    caption: { en: "Greenery arch and drapery wall", fr: "Arche de verdure et mur de voilage" },
    alt: {
      en: "Greenery arch in front of a white drapery wall",
      fr: "Arche de verdure devant un mur de voilage blanc",
    },
  }),
  photo({
    src: "/images/gallery-bridal-shower.jpg",
    width: 537,
    height: 832,
    caption: { en: "Bridal shower decorations", fr: "Décorations de shower de mariée" },
    alt: {
      en: "Long bridal shower table with pink flowers and vases",
      fr: "Longue table de shower de mariée avec fleurs roses et vases",
    },
  }),
  photo({
    src: "/images/gallery-wood-wall.jpg",
    width: 768,
    height: 1152,
    caption: { en: "Wood wall · white roses", fr: "Mur de bois · roses blanches" },
    alt: {
      en: "Reception table in front of a wood wall with white roses and candles",
      fr: "Table de réception devant un mur de bois avec roses blanches et chandelles",
    },
  }),
  photo({
    src: "/images/gallery-bud-vases.jpg",
    width: 768,
    height: 1152,
    caption: { en: "Ivory and blush bud vases", fr: "Vases ivoire et blush" },
    alt: {
      en: "Long table lined with small ivory and blush bud vases",
      fr: "Longue table ornée de petits vases ivoire et blush",
    },
  }),
  photo({
    src: "/images/gallery-evening-drape.jpg",
    width: 2304,
    height: 3456,
    category: "reception",
    caption: { en: "Evening drapery and string lights", fr: "Voilage du soir et guirlandes" },
    alt: {
      en: "White drapery and string lights over a candlelit evening reception table",
      fr: "Voilages blancs et guirlandes lumineuses au-dessus d'une table de réception aux chandelles, en soirée",
    },
  }),
];
