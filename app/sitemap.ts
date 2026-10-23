import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const paths: { path: string; priority: number; frPriority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, frPriority: 0.9, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, frPriority: 0.8, changeFrequency: "weekly" },
  { path: "/wedding-decor-montreal", priority: 0.9, frPriority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, frPriority: 0.6, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.7, frPriority: 0.6, changeFrequency: "monthly" },
  { path: "/plan", priority: 0.7, frPriority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.flatMap(({ path, priority, frPriority, changeFrequency }) => {
    const en = path ? `${SITE_URL}${path}` : SITE_URL;
    const fr = path ? `${SITE_URL}/fr${path}` : `${SITE_URL}/fr`;
    const languages = { "en-CA": en, "fr-CA": fr, "x-default": en };
    return [
      { url: en, lastModified, changeFrequency, priority, alternates: { languages } },
      { url: fr, lastModified, changeFrequency, priority: frPriority, alternates: { languages } },
    ];
  });
}