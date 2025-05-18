import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: "https://www.wada-sanzo-colors.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.wada-sanzo-colors.com/about",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://www.wada-sanzo-colors.com/inspiration",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    ...colorsWithSlug.map((c) => ({
      url: `https://www.wada-sanzo-colors.com/colors/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as
        | "yearly"
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "never"
        | undefined,
      priority: 0.5,
    })),
    ...createCombinationArray(colorsWithSlug).map((c) => ({
      url: `https://www.wada-sanzo-colors.com/combinations/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as
        | "yearly"
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "never"
        | undefined,
      priority: 0.5,
    })),
  ];

  return urls;
}
