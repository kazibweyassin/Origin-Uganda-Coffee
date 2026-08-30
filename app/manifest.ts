import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Origin Uganda Coffee",
    short_name: "Origin Uganda",
    description: "Source Ugandan green coffee direct from origin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#173c2d",
  };
}

