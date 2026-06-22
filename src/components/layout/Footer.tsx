import Link from "next/link";
import type { SiteBrokerage, SiteContact, SiteAgent } from "@/lib/content/types";

interface FooterProps {
  agent: SiteAgent;
  contact: SiteContact;
  brokerage: SiteBrokerage;
}

export function Footer({ agent, contact, brokerage }: FooterProps) {
  const fullAddress = `${brokerage.address}, ${brokerage.city}, ${brokerage.state} ${brokerage.zip}`;

  return (
    <footer className="bg-ocean text-white">
      <div className="section-padding pb-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-widest text-gold uppercase">
              {brokerage.short_name}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {brokerage.name}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">
              Contact
            </h3>
            <p className="font-serif text-lg">{agent.name}</p>
            <p className="mt-1 text-sm text-white/60">{agent.title}, MBA</p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-3 block text-sm transition-colors hover:text-gold"
            >
              {contact.phone_display}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-sm transition-colors hover:text-gold"
            >
              {contact.email}
            </a>
            <p className="mt-2 text-sm text-white/60">
              WeChat: {contact.wechat}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">
              Office
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              {fullAddress}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About Omeo" },
                { href: "/listings", label: "Active Listings" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/neighborhoods", label: "Neighborhoods" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
            <p>
              {agent.name}, {agent.title} · License {agent.credentials.find((c) => c.startsWith("RB"))} ·{" "}
              {brokerage.name}
            </p>
            <p>© {new Date().getFullYear()} {brokerage.name}. All rights reserved.</p>
          </div>
          <p className="mt-3 text-xs text-white/30">
            Equal Housing Opportunity. All information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
