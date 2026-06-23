import Link from "next/link";
import { AgentPortrait } from "@/components/AgentPortrait";
import { SectionHeading, SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { getSiteConfig } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "About Omeo Fan | Honolulu Real Estate Broker",
  description:
    "Learn about Omeo Fan, Principal Broker at 4You Hawaii International Realty — MBA, RB-22037, serving buyers and sellers across Oʻahu with client-first guidance.",
  path: "/about",
});

export default function AboutPage() {
  const site = getSiteConfig();

  return (
    <>
      <section className="page-hero-padding bg-navy">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              About
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl lg:text-6xl">
              Meet {site.agent.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
              {site.agent.title} at {site.brokerage.name} — helping clients
              buy, sell, and relocate across Oʻahu.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <AgentPortrait
              name={site.agent.name}
              photo={site.about.photo}
              credentials={site.agent.credentials}
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-4 text-base leading-relaxed text-foreground/70">
              {site.about.full.trim().split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-sand pt-10">
              <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                Languages
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {site.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-sky/40 px-4 py-2 text-sm text-navy"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-sand pt-10">
              <h2 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                Credentials
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                <li>Principal Broker, {site.brokerage.name}</li>
                <li>MBA, Finance & Management — University of Hawaiʻi</li>
                <li>BBA, Accounting & MIS — University of Hawaiʻi</li>
                <li>
                  License{" "}
                  {site.agent.credentials.find((c) => c.startsWith("RB"))}
                </li>
              </ul>
            </div>

            <Link href="/contact" className="btn-primary mt-10 inline-flex">
              Request a Consultation
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Value sections */}
      <SectionWrapper className="bg-sky/30">
        <FadeIn>
          <SectionHeading
            label="Approach"
            title="How Omeo Supports Clients"
            description="General service areas — specific claims and credentials to be confirmed with the client."
          />
        </FadeIn>
        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3 md:mt-12">
          {site.value_sections.map((section) => (
            <StaggerItem key={section.title}>
              <article className="h-full rounded-sm border border-sand bg-white p-7 md:p-8">
                <h3 className="font-serif text-xl text-navy">{section.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {section.description.trim()}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>
    </>
  );
}
