import { ContactForm } from "@/components/ContactForm";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSiteConfig } from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const site = getSiteConfig();
  const fullAddress = `${site.brokerage.address}, ${site.brokerage.city}, ${site.brokerage.state} ${site.brokerage.zip}`;

  return (
    <>
      <section className="bg-navy section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Get in Touch
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Let&apos;s Connect
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              Whether you&apos;re buying, selling, or exploring your options —
              Omeo is here to help.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper className="pb-24 lg:pb-28">
        <div className="grid gap-16 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <ContactForm agentName={site.agent.name} />
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="space-y-10">
              <div>
                <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  Contact Details
                </h2>
                <p className="mt-4 font-serif text-2xl text-navy">
                  {site.agent.name}
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  {site.agent.title}, MBA
                </p>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="mt-4 block text-lg text-ocean transition-colors hover:text-gold"
                >
                  {site.contact.phone_display}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-2 block text-sm text-foreground/70 transition-colors hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </div>

              <div id="wechat" className="rounded-sm border border-sand bg-sky/20 p-6">
                <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  WeChat
                </h3>
                <p className="mt-3 font-serif text-xl text-navy">
                  {site.contact.wechat}
                </p>
                <p className="mt-2 text-sm text-foreground/60">
                  Connect on WeChat for international inquiries.
                </p>
                {site.contact.wechat_qr && (
                  <p className="mt-4 text-xs text-foreground/50">
                    Scan QR code: {site.contact.wechat_qr}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  Office
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {site.brokerage.name}
                  <br />
                  {fullAddress}
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  Languages
                </h3>
                <p className="mt-3 text-sm text-foreground/70">
                  {site.languages.join(" · ")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>
    </>
  );
}
