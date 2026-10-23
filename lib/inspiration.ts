import type { Localized } from "@/lib/types";
import { GALLERY } from "@/lib/products";

export type InspirationCategory = "ceremony" | "reception" | "shower";

export type InspirationItem = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
  category: InspirationCategory;
  shape: "tall" | "short";
};

function caption(src: string): Localized {
  const item = GALLERY.find((entry) => entry.src === src);
  return item ? { en: item.caption.en, fr: item.caption.fr } : { en: "", fr: "" };
}

// Eight photos from the gallery, laid out as four columns of one 4:5 and one 2:3
// tile each so the columns end level. Categories were assigned from the photos;
// the gallery itself has no tags yet.
export const INSPIRATION: InspirationItem[][] = [
  [
    {
      src: "/images/gallery-1.jpg",
      width: 1024,
      height: 1280,
      shape: "short",
      category: "ceremony",
      caption: caption("/images/gallery-1.jpg"),
      alt: {
        en: "Outdoor ceremony aisle under white drapery and a chandelier, Jardin Bordeaux",
        fr: "Allée de cérémonie en plein air sous voilages blancs et lustre, Jardin Bordeaux",
      },
    },
    {
      src: "/images/gallery-candelabra.jpg",
      width: 768,
      height: 1152,
      shape: "tall",
      category: "reception",
      caption: caption("/images/gallery-candelabra.jpg"),
      alt: {
        en: "Reception table set with brass candelabras and white candles",
        fr: "Table de réception dressée avec candélabres de laiton et chandelles blanches",
      },
    },
  ],
  [
    {
      src: "/images/gallery-garden-lanterns.jpg",
      width: 768,
      height: 1152,
      shape: "tall",
      category: "reception",
      caption: caption("/images/gallery-garden-lanterns.jpg"),
      alt: {
        en: "Garden rose centrepiece surrounded by lit lanterns",
        fr: "Centre de table de roses de jardin entouré de lanternes allumées",
      },
    },
    {
      src: "/images/gallery-2.jpg",
      width: 1024,
      height: 1280,
      shape: "short",
      category: "reception",
      caption: caption("/images/gallery-2.jpg"),
      alt: {
        en: "Hilton Bonaventure reception room with candles and floral arrangements",
        fr: "Salle de réception du Hilton Bonaventure avec chandelles et arrangements floraux",
      },
    },
  ],
  [
    {
      src: "/images/gallery-3.jpg",
      width: 1024,
      height: 1280,
      shape: "short",
      category: "ceremony",
      caption: caption("/images/gallery-3.jpg"),
      alt: {
        en: "Greenery arch in front of a white drapery wall in an art museum",
        fr: "Arche de verdure devant un mur de voilage blanc dans un musée d'art",
      },
    },
    {
      src: "/images/gallery-wood-wall.jpg",
      width: 768,
      height: 1152,
      shape: "tall",
      category: "reception",
      caption: caption("/images/gallery-wood-wall.jpg"),
      alt: {
        en: "Reception table in front of a wood wall with white roses and candles",
        fr: "Table de réception devant un mur de bois avec roses blanches et chandelles",
      },
    },
  ],
  [
    {
      src: "/images/gallery-bridal-shower.jpg",
      width: 537,
      height: 832,
      shape: "tall",
      category: "shower",
      caption: caption("/images/gallery-bridal-shower.jpg"),
      alt: {
        en: "Long bridal shower table with pink flowers and vases",
        fr: "Longue table de shower de mariée avec fleurs roses et vases",
      },
    },
    {
      src: "/images/gallery-bud-vases.jpg",
      width: 768,
      height: 1152,
      shape: "short",
      category: "reception",
      caption: caption("/images/gallery-bud-vases.jpg"),
      alt: {
        en: "Long table lined with small ivory and blush bud vases",
        fr: "Longue table ornée de petits vases ivoire et blush",
      },
    },
  ],
];
