import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact the Coffee Trade Desk" };

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Trade desk"
        title="Talk to the Rwenza Coffee team"
        copy="For coffee availability, samples, specifications, logistics and partnership enquiries, contact the Rwenza Coffee desk."
        image="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Coffee professional working at an origin trade desk"
        creditUrl="https://unsplash.com/photos/f71d768fd07c"
      />
      <section className="section">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Trade enquiries</p>
            <h2>A direct line to origin.</h2>
            <p>Send a structured RFQ for the fastest commercial response, or contact us for a broader sourcing conversation.</p>
          </div>
          <div className="contact-cards">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail/>
              <span><small>Email</small>{siteConfig.email}</span>
            </a>
            <a href="tel:+256700000000">
              <MessageCircle/>
              <span><small>WhatsApp / phone</small>+256 700 000 000</span>
            </a>
            <div>
              <MapPin/>
              <span><small>Origin office</small>{siteConfig.location}</span>
            </div>
            <div>
              <Clock3/>
              <span><small>Working hours</small>Mon–Fri · 08:30–17:30 EAT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
