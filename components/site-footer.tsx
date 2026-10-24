import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand brand-light">
            <span className="brand-mark"><Sprout size={19}/></span>
            <span>RWENZA<span>COFFEE</span></span>
          </Link>
          <p>Direct access to export-ready Ugandan green coffee, backed by documented quality and traceability.</p>
        </div>
        <div>
          <h3>Source</h3>
          <Link href="/coffee">Available lots</Link>
          <Link href="/request-quote">Request quote</Link>
          <Link href="/request-sample">Request sample</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About Uganda coffee</Link>
          <Link href="/insights">Buyer insights</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h3>Trade desk</h3>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email} <ArrowUpRight size={14}/></a>
          <p>{siteConfig.location}<br/>Mon–Fri, EAT (UTC+3)</p>
          <p>{siteConfig.domain}<br/>{siteConfig.alternateDomain}</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>Green coffee export sourcing</span>
      </div>
    </footer>
  );
}
