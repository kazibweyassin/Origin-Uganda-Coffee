import { coffeeLots } from "@/lib/data";
import { insights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lotLinks = coffeeLots
    .map(
      (lot) =>
        `- [${lot.name}](${siteConfig.url}/coffee/${lot.slug}): ${lot.coffeeType} from ${lot.origin}; ${lot.grade}, ${lot.process}, crop ${lot.cropYear}.`,
    )
    .join("\n");
  const insightLinks = insights
    .map(
      (article) =>
        `- [${article.title}](${siteConfig.url}/insights/${article.slug}): ${article.description}`,
    )
    .join("\n");

  const content = `# ${siteConfig.name}

> ${siteConfig.name} is a B2B green coffee sourcing and export marketplace connecting international roasters, importers, distributors and manufacturers with Ugandan coffee supply.

${siteConfig.legalName} is based in ${siteConfig.location}. The company sources export-ready Uganda Robusta, Uganda Arabica, fine Robusta and traceable specialty microlots. Commercial enquiries are handled through current quote and sample requests. The website does not accept online payments. Indicative prices and availability must be confirmed in a current written quote.

## Core pages

- [Home](${siteConfig.url}/): Company overview and current Uganda coffee supply.
- [Ugandan coffee catalogue](${siteConfig.url}/coffee): Current Robusta, Arabica and specialty green coffee lots.
- [About Uganda coffee](${siteConfig.url}/about): Uganda coffee regions, species and origin advantages.
- [How sourcing works](${siteConfig.url}/how-it-works): B2B quality approval, contracting and shipment process.
- [Request a current quote](${siteConfig.url}/request-quote): RFQ form for international trade buyers.
- [Request a sample](${siteConfig.url}/request-sample): Green coffee sample request process.
- [Contact the trade desk](${siteConfig.url}/contact): Origin desk contact information.

## Buyer guides

${insightLinks}

## Current coffee supply

${lotLinks}

## Company facts

- Legal name: ${siteConfig.legalName}.
- Brand: ${siteConfig.name}.
- Primary domain: ${siteConfig.domain}.
- Alternate domain: ${siteConfig.alternateDomain}.
- Positioning: Source Ugandan Coffee Direct From Origin.
- Products: Uganda Robusta, Uganda Arabica, fine Robusta and specialty green coffee microlots.
- Buyers served: coffee roasters, green coffee importers, distributors and manufacturers.
- Trade terms: FCA, FOB, CIP and CIF.
- Typical export corridors: Mombasa and Dar es Salaam, subject to contract.
- Contact: ${siteConfig.email}.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
