import Link from "next/link";
import { Menu, Sprout } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return <header className="site-header">
    <div className="shell nav-wrap">
      <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}><span className="brand-mark"><Sprout size={19}/></span><span>RWENZA<span>COFFEE</span></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
<Link href="/coffee">Coffee lots</Link><Link href="/about">Why Uganda</Link><Link href="/services">Services</Link><Link href="/insights">Insights</Link><Link href="/how-it-works">How it works</Link><Link href="/contact">Contact</Link>
      </nav>
      <Link href="/request-quote" className="button button-small desktop-cta">Request current quote</Link>
      <details className="mobile-menu"><summary aria-label="Open navigation"><Menu/></summary><nav><Link href="/coffee">Coffee lots</Link><Link href="/about">Why Uganda</Link><Link href="/services">Services</Link><Link href="/insights">Insights</Link><Link href="/how-it-works">How it works</Link><Link href="/contact">Contact</Link><Link href="/request-quote">Request quote</Link></nav></details>
    </div>
  </header>
}
