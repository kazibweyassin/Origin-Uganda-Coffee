export const siteConfig = {
  name: "Origin Uganda Coffee",
  legalName: "Origin Uganda Coffee Limited",
  description:
    "B2B sourcing platform for export-ready Ugandan Robusta, Arabica and traceable specialty green coffee lots.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://originugandacoffee.com").replace(/\/$/, ""),
  email: "trade@originuganda.coffee",
  location: "Kampala, Uganda",
} as const;

