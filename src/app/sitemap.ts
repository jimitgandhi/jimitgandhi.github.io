import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [site.avatar, site.portrait, ...projects.flatMap((p) => (p.image ? [p.image] : []))];
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: images.map((src) => `${site.url}${src}`),
    },
  ];
}
