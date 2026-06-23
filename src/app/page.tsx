import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ActionCards } from "@/components/ActionCards";
import { AgentPortrait } from "@/components/AgentPortrait";
import { FeaturedListings } from "@/components/ListingCard";
import { NeighborhoodCard } from "@/components/NeighborhoodCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TrustIntro, AreasServed } from "@/components/TrustIntro";
import { SectionHeading, SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { buildPageMetadata } from "@/lib/seo";
import {
  getSiteConfig,
  getFeaturedListings,
  getVisibleNeighborhoods,
  getVisibleTestimonials,
} from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Omeo Fan | Oʻahu Real Estate Agent",
  description:
    "Omeo Fan, Principal Broker at 4You Hawaii International Realty, helps buyers, sellers, and relocating clients navigate Honolulu and greater Oʻahu real estate.",
  path: "/",
});

export default function HomePage() {
  const site = getSiteConfig();
  const featured = getFeaturedListings().slice(0, 6);
  const neighborhoods = getVisibleNeighborhoods().slice(0, 6);
  const testimonials = getVisibleTestimonials();

  return (
    <>
      <Hero
        name={site.agent.name}
        title={site.agent.title}
        tagline={site.agent.tagline}
        headline={site.agent.headline}
        credentials={site.agent.credentials}
        brokerage={site.brokerage.short_name}
      />

      <TrustIntro
        title={site.trust_intro.title}
        text={site.trust_intro.text}
      />

      {/* Meet Omeo */}
      <SectionWrapper className="bg-background">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <AgentPortrait
              name={site.agent.name}
              photo={site.about.photo}
              credentials={site.agent.credentials}
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionHeading
              label="Meet Omeo"
              title={site.agent.name}
              align="left"
            />
            <p className="mt-2 text-xs tracking-[0.2em] text-gold uppercase">
              {site.agent.title} · {site.brokerage.name}
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/70">
              {site.about.short.trim().split("\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.languages.map((lang) => (
                <span
                  key={lang}
                  className="border border-ocean/15 bg-sky/30 px-3 py-1.5 text-xs text-ocean-light"
                >
                  {lang}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-outline-dark mt-8 inline-flex">
              About Omeo
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* CTA cards */}
      <SectionWrapper className="bg-sand/40">
        <FadeIn>
          <ActionCards />
        </FadeIn>
      </SectionWrapper>

      <AreasServed areas={site.areas_served} />

      {/* Brand callout */}
      <SectionWrapper className="bg-sky/40">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.25em] text-ocean-light uppercase">
              {site.brokerage.short_name}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
              {site.brand.callout_title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              {site.brand.callout_text.trim()}
            </p>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper className="bg-navy">
        <FadeIn>
          <SectionHeading
            label="Client Stories"
            title="What Clients Say"
            description="Client testimonials will be added after client review."
            light
          />
          <div className="mt-10 md:mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Featured listings */}
      <SectionWrapper className="bg-background">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              label="Portfolio Preview"
              title="Featured Properties"
              description="Sample listing layouts shown below. Real properties will be added after client approval."
              align="left"
            />
            <Link
              href="/portfolio"
              className="shrink-0 text-xs tracking-widest text-ocean-light uppercase hover:text-gold"
            >
              View Portfolio →
            </Link>
          </div>
        </FadeIn>
        <div className="mt-8 md:mt-10">
          <FeaturedListings listings={featured} />
        </div>
      </SectionWrapper>

      {/* Neighborhoods */}
      <SectionWrapper className="bg-sand/40">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              label="Oahu Communities"
              title="Explore Neighborhoods"
              align="left"
            />
            <Link
              href="/neighborhoods"
              className="shrink-0 text-xs tracking-widest text-ocean-light uppercase hover:text-gold"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:mt-10">
          {neighborhoods.map((n) => (
            <StaggerItem key={n.slug}>
              <NeighborhoodCard neighborhood={n} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Valuation CTA */}
      <SectionWrapper className="bg-ocean">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              title="How Much is Your Home Worth?"
              description="Request a complimentary consultation to understand your home's position in the current Oʻahu market."
              light
            />
            <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-white/60">
              <li>Personalized guidance</li>
              <li aria-hidden="true">·</li>
              <li>Local market insight</li>
              <li aria-hidden="true">·</li>
              <li>No-obligation consultation</li>
            </ul>
            <Link
              href="/contact?interest=valuation"
              className="btn-primary mt-10 inline-flex"
            >
              Request a Home Valuation
            </Link>
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Work with Omeo */}
      <SectionWrapper>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              title={`Work With ${site.agent.name.split(" ")[0]}`}
              description="Serving buyers, sellers, and relocating clients across Honolulu and greater Oʻahu with thoughtful, client-first real estate guidance."
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/contact" className="btn-primary min-w-[200px]">
                Schedule a Consultation
              </Link>
              <Link
                href={`tel:${site.contact.phone}`}
                className="btn-outline-dark min-w-[200px]"
              >
                {site.contact.phone_display}
              </Link>
            </div>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
