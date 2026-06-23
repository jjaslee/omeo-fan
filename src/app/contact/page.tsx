import { ContactForm } from "@/components/ContactForm";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSiteConfig } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Omeo Fan | Schedule a Consultation",
  description:
    "Contact Omeo Fan for Oʻahu real estate consultations — buying, selling, home valuations, and relocation guidance. Phone, email, WeChat, and office in Honolulu.",
  path: "/contact",
});

interface Props {
  searchParams: Promise<{ interest?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const site = getSiteConfig();
  const params = await searchParams;
  const fullAddress = `${site.brokerage.address}, ${site.brokerage.city}, ${site.brokerage.state} ${site.brokerage.zip}`;

  return (
    <>
      <section className="page-hero-padding bg-navy">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Get in Touch
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Contact Omeo Fan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Buying, selling, relocating, or exploring your options on Oʻahu —
              reach out for a complimentary consultation.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper className="pb-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <FadeIn className="lg:col-span-3">
            <ContactForm
              agentName={site.agent.name}
              defaultInterest={params.interest ?? ""}
            />
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-2">
            <aside className="space-y-8 lg:sticky lg:top-28">
              <ContactBlock title="Phone">
                <a
                  href={`tel:${site.contact.phone}`}
                  className="text-lg text-ocean transition-colors hover:text-gold"
                >
                  {site.contact.phone_display}
                </a>
                <p className="mt-1 text-xs text-foreground/45">
                  Call for immediate assistance
                </p>
              </ContactBlock>

              <ContactBlock title="Email">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm text-navy transition-colors hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </ContactBlock>

              <div
                id="wechat"
                className="rounded-sm border border-sand bg-sky/25 p-6"
              >
                <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  WeChat
                </h2>
                <p className="mt-3 font-serif text-xl text-navy">
                  {site.contact.wechat}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  Connect on WeChat for international and relocation inquiries.
                </p>
              </div>

              <ContactBlock title="Office">
                <p className="text-sm leading-relaxed text-foreground/70">
                  {site.brokerage.name}
                  <br />
                  {fullAddress}
                </p>
              </ContactBlock>

              <ContactBlock title="Languages">
                <p className="text-sm text-foreground/70">
                  {site.languages.join(" · ")}
                </p>
              </ContactBlock>

              <div className="rounded-sm border border-gold/25 bg-gold/5 p-6">
                <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                  Consultation
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  Prefer to talk first? Call or email directly — no form required.
                  Consultations are complimentary and tailored to your goals.
                </p>
              </div>
            </aside>
          </FadeIn>
        </div>
      </SectionWrapper>
    </>
  );
}

function ContactBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
