export const siteConfig = {
  name: "Rwenza Coffee",
  legalName: "Rwenza Coffee Limited",
  description:
    "B2B coffee marketplace and sourcing platform for export-ready Ugandan Robusta, Arabica and traceable specialty green coffee lots.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://rwenzacoffee.com").replace(/\/$/, ""),
  domain: "rwenzacoffee.com",
  alternateDomain: "rwenza.coffee",
  alternateUrl: "https://rwenza.coffee",
  email: "trade@rwenzacoffee.com",
  location: "Kampala, Uganda",
} as const;
