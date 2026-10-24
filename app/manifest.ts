import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Rwenza",
    description: `Source Ugandan green coffee direct from origin through ${siteConfig.name}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#173c2d",
  };
}
