import type { MetadataRoute } from "next";
import { blogPosts } from "@/utils/blog-posts";
import { locationSlugs } from "@/utils/location-pages";

const SITE_URL = "https://www.djvicle.de";

const staticRoutes = [
  "",
  "/booking",
  "/gallery",
  "/appointments",
  "/blog",
  "/standorte",
  "/privacypolicy",
  "/legalnotice",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
    images: route === "" ? [`${SITE_URL}/logo.png`, `${SITE_URL}/vadimhero.JPG`] : undefined,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE_URL}/vadimbooking.jpg`],
  }));

  const locationUrls: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${SITE_URL}/standorte/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE_URL}/setup.JPG`],
  }));

  return [...staticUrls, ...blogUrls, ...locationUrls];
}
