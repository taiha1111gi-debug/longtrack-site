import type { MetadataRoute } from "next";
import { getAllEditableRecords, getPlayerProfileOverrides } from "./lib/db";
import { createPlayerProfiles } from "./records/data";

const siteUrl = "https://main.d2913wee5pzbjt.amplifyapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/players",
    "/races",
    "/records",
    "/records/5000m",
    "/records/10000m",
    "/records/5000m/season",
    "/records/10000m/season",
    "/records/freshman-2027-5000",
  ];

  const playerRoutes = createPlayerProfiles(
    getAllEditableRecords(),
    getPlayerProfileOverrides(),
  ).map((player) => `/players/${player.slug}`);

  return [...staticRoutes, ...playerRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/players/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/players/") ? 0.5 : 0.8,
  }));
}
