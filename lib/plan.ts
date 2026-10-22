import { findProduct, localizeVariant } from "@/lib/products";
import type { CartLine, Locale } from "@/lib/types";

export type PlanSetting = "" | "indoor" | "outdoor" | "both";
export type TentNeed = "" | "yes" | "venue" | "unsure";
export type PlanAnswers = {
  keepCart: boolean;
  eventDate: string;
  guestCount: number | "";
  setting: PlanSetting;
  tentNeed: TentNeed;
  mood: string;
};

export const EMPTY_PLAN: PlanAnswers = {
  keepCart: true,
  eventDate: "",
  guestCount: "",
  setting: "",
  tentNeed: "",
  mood: "",
};

export const MOODS = [
  {
    id: "ivory-garden",
    image: "/images/product-arch.jpg",
    name: { en: "Ivory garden", fr: "Jardin ivoire" },
    lede: { en: "Arch, sheer drapery, and silk garden roses.", fr: "Arche, voilage et roses de jardin en soie." },
    productIds: ["ivory-bloom-arch", "sheer-drapery-wall", "garden-rose-arrangement"],
  },
  {
    id: "candlelit",
    image: "/images/vintage-brass-gold-candle-holders.jpg",
    name: { en: "Candlelight", fr: "Chandelles" },
    lede: { en: "Vintage brass holders, a white lantern, and drapery.", fr: "Bougeoirs vintage, lanterne blanche et voilage." },
    productIds: ["brass-candle-trio", "white-lantern", "sheer-drapery-wall"],
  },
  {
    id: "modern",
    image: "/images/acrylic-pedestal.png",
    name: { en: "Modern acrylic", fr: "Acrylique contemporain" },
    lede: { en: "Clear pedestal, crystal cascade, and a welcome sign.", fr: "Piédestal transparent, cascade de cristaux et panneau de bienvenue." },
    productIds: ["acrylic-pedestal-stand", "crystal-cascade-arrangement", "acrylic-welcome-sign"],
  },
] as const;

const STORAGE_KEY = "jm-decor-plan";

export function tentForGuests(guests: number) {
  if (guests <= 40) return "ivory-frame-tent-10x20";
  if (guests <= 60) return "ivory-frame-tent-10x30";
  if (guests <= 160) return "grand-ivory-frame-tent-20x40";
  return "full-garden-tent-collection";
}

export function planSteps(plan: PlanAnswers, cartCount: number) {
  const steps = ["date", "guests", "setting"];
  if (cartCount > 0) steps.unshift("keep");
  if (plan.setting === "outdoor" || plan.setting === "both") steps.push("tent");
  steps.push("mood", "review");
  return steps;
}

export function canAdvance(step: string, plan: PlanAnswers) {
  if (step === "guests") return typeof plan.guestCount === "number" && plan.guestCount > 0;
  if (step === "setting") return plan.setting !== "";
  if (step === "tent") return plan.tentNeed !== "";
  if (step === "mood") return plan.mood !== "";
  return true;
}

export function lookLines(plan: PlanAnswers, locale: Locale): Omit<CartLine, "quantity">[] {
  const ids: string[] = [];
  const guests = typeof plan.guestCount === "number" ? plan.guestCount : 0;
  if ((plan.setting === "outdoor" || plan.setting === "both") && plan.tentNeed === "yes" && guests > 0) {
    ids.push(tentForGuests(guests));
  }
  const mood = MOODS.find((item) => item.id === plan.mood);
  if (mood) ids.push(...mood.productIds);
  return [...new Set(ids)].flatMap((id) => {
    const product = findProduct(id);
    if (!product) return [];
    return [localizeVariant(product, product.variants[0], locale)];
  });
}

export function lookSummary(plan: PlanAnswers, locale: Locale) {
  const mood = MOODS.find((item) => item.id === plan.mood);
  const guests = typeof plan.guestCount === "number" ? plan.guestCount : 0;
  const tent = (plan.setting === "outdoor" || plan.setting === "both") && plan.tentNeed === "yes" && guests > 0
    ? findProduct(tentForGuests(guests))
    : undefined;
  if (locale === "fr") {
    const place = plan.setting === "indoor" ? "à l'intérieur" : plan.setting === "outdoor" ? "en extérieur" : "intérieur et extérieur";
    const cover = tent ? ` avec ${tent.name.fr}` : plan.tentNeed === "venue" ? ", le lieu fournit déjà un abri" : "";
    return `Un look ${mood?.name.fr.toLowerCase() ?? "sur mesure"}${guests ? ` pour ${guests} invités` : ""}, ${place}${cover}. Tables et chaises en location séparée.`;
  }
  const place = plan.setting === "indoor" ? "indoors" : plan.setting === "outdoor" ? "outdoors" : "indoors and out";
  const cover = tent ? ` with the ${tent.name.en}` : plan.tentNeed === "venue" ? ", with cover already at the venue" : "";
  const name = mood?.name.en.toLowerCase() ?? "custom";
  const article = /^[aeiou]/i.test(name) ? "An" : "A";
  return `${article} ${name} look${guests ? ` for ${guests} guests` : ""}, ${place}${cover}. Tables and chairs rented separately.`;
}

export function readPlan(): PlanAnswers | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...EMPTY_PLAN, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export function writePlan(plan: PlanAnswers) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    /* ignore */
  }
}
