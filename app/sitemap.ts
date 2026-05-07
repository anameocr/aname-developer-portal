import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://developers.anameai.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/quickstart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
