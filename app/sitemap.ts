import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const paths = ["", "/shop", "/gallery", "/quote", "/plan", "/wedding-decor-montreal"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.flatMap((path) => {
    const priority = path === "" ? 1 : path === "/shop" || path === "/wedding-decor-montreal" ? 0.9 : 0.7;
    const changeFrequency = path === "" || path === "/shop" ? "weekly" : "monthly";
    return [
      {
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            "en-CA": `${SITE_URL}${path || "/"}`,
            "fr-CA": `${SITE_URL}/fr${path}`,
          },
        },
      },
      {
        url: `${SITE_URL}/fr${path}`,
        lastModified,
        changeFrequency,
        priority: Math.max(priority - 0.05, 0.6),
        alternates: {
          languages: {
            "en-CA": `${SITE_URL}${path || "/"}`,
            "fr-CA": `${SITE_URL}/fr${path}`,
          },
        },
      },
    ];
  });
}
