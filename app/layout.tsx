import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets:["latin"], variable:"--font-sans" });
const serif = Source_Serif_4({ subsets:["latin"], variable:"--font-serif" });
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title:{default:"Origin Uganda Coffee | Ugandan Green Coffee Export",template:"%s | Origin Uganda Coffee"},
  description:"Source export-ready Ugandan Robusta, Arabica, fine Robusta and traceable specialty green coffee lots direct from origin.",
  applicationName:siteConfig.name,
  category:"B2B green coffee sourcing and export",
  keywords:["Uganda coffee exporter","Ugandan green coffee","Uganda Robusta coffee","Uganda Arabica coffee","green coffee supplier Uganda","specialty coffee Uganda","buy Ugandan coffee wholesale","coffee sourcing Uganda"],
  alternates:{types:{"text/markdown":"/llms.txt"}},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph:{type:"website",locale:"en_UG",siteName:siteConfig.name,url:"/",title:"Source Ugandan Coffee Direct From Origin",description:"Export-ready Ugandan green coffee for roasters, importers, distributors and manufacturers.",images:[{url:"https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&h=630&q=85",width:1200,height:630,alt:"Ugandan coffee at origin"}]},
  twitter:{card:"summary_large_image",title:"Origin Uganda Coffee",description:"Source Ugandan green coffee direct from origin.",images:["https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&h=630&q=85"]},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  const organization={"@context":"https://schema.org","@type":"Organization","@id":`${siteConfig.url}/#organization`,name:siteConfig.name,legalName:siteConfig.legalName,url:siteConfig.url,email:siteConfig.email,description:siteConfig.description,address:{"@type":"PostalAddress",addressLocality:"Kampala",addressCountry:"UG"},areaServed:"Worldwide",knowsAbout:["Uganda Robusta coffee","Uganda Arabica coffee","green coffee export","specialty coffee microlots","coffee traceability"]};
  const website={"@context":"https://schema.org","@type":"WebSite","@id":`${siteConfig.url}/#website`,url:siteConfig.url,name:siteConfig.name,publisher:{"@id":`${siteConfig.url}/#organization`},inLanguage:"en"};
  return <html lang="en"><body suppressHydrationWarning className={`${manrope.variable} ${serif.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([organization,website]).replace(/</g,"\\u003c")}}/><SiteHeader/><main>{children}</main><SiteFooter/></body></html>
}
