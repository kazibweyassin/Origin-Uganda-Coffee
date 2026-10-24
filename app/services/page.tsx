import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bean, CheckCircle2, Package, Ship, Sprout } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Services" };

const valueChain = [
  [Sprout, "Sourcing", "Direct relationships with farmers across Mount Elgon, Rwenzori, West Nile and Central Uganda."],
  [Bean, "Roasting", "Roasted at our Kampala facility across light, medium and dark profiles."],
  [Package, "Packaging", "Airtight, valve-sealed, eco-friendly recyclable bags with full traceability labels."],
  [Ship, "Delivery", "Doorstep and wholesale delivery across Uganda and export channels."],
];

const roasts = [
  ["Medium Roast", "Caramel, hazelnut, dark chocolate, honey, vanilla; fruity sweet aftertaste, moderate acidity."],
  ["Medium Dark Roast", "More pronounced caramel and chocolate; dominant bitter-sweet finish."],
  ["Dark Roast", "Smokey caramel, hazelnut, dark chocolate; mildly sweet, low acidity."],
];

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Our services" title="From green bean to delivered coffee" copy="Roasted ground coffee, green beans and wholesale supply covering the entire value chain." image="https://images.unsplash.com/photo-1459339331461-48d103e41528?auto=format&fit=crop&w=2000&q=85" imageAlt="Coffee beans" creditUrl="https://unsplash.com/photos/1459339331461" />
      <section className="section">
        <div className="shell editorial-grid">
          <div><p className="eyebrow">Value chain</p><h2>What we do.</h2></div>
          <div className="value-grid">
            {valueChain.map(([I, t, b]) => (
              <div key={String(t)} className="value-card">
                <I />
                <h3>{String(t)}</h3>
                <p>{String(b)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section paper-band">
        <div className="shell">
          <p className="eyebrow">Roasted ground coffee</p>
          <h2>Roast profiles.</h2>
          <div className="roast-grid">
            {roasts.map(([t, b]) => (
              <article key={t} className="roast-card">
                <h3>{t}</h3>
                <p>{b}</p>
                <Link href="/request-quote" className="button button-small">Request quote <ArrowRight /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell cta-row">
          <div>
            <p className="eyebrow">Wholesale</p>
            <h2>Supply for cafés, restaurants and offices.</h2>
            <p>Elevate your coffee experience with tailored wholesale programmes.</p>
          </div>
          <Link href="/contact" className="button">Book your appointment <ArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
