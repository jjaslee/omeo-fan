import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ActionCards } from "@/components/ActionCards";
import { AgentPortrait } from "@/components/AgentPortrait";
import { ListingCard } from "@/components/ListingCard";
import { NeighborhoodCard } from "@/components/NeighborhoodCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { SectionHeading, SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import {
  getSiteConfig,
  getFeaturedListings,
  getVisibleNeighborhoods,
  getVisibleTestimonials,
} from "@/lib/content/load";

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
      />

      {/* Meet Omeo */}
      <SectionWrapper className="bg-background">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
              {site.agent.title} · REALTOR®
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
                  className="border border-ocean/20 px-3 py-1 text-xs text-ocean-light"
                >
                  {lang}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-outline-dark mt-8 inline-flex">
              Learn More
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      {/* Brand callout */}
      <SectionWrapper className="bg-sky/50">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.25em] text-ocean-light uppercase">
              Island Living
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

      {/* Buy / Connect / Sell */}
      <SectionWrapper>
        <FadeIn>
          <ActionCards />
        </FadeIn>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper className="bg-navy">
        <FadeIn>
          <SectionHeading
            label="Client Stories"
            title="Success Stories"
            light
          />
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Featured listings */}
      <SectionWrapper className="bg-background">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <SectionHeading
              label="Portfolio"
              title="Featured Properties"
              align="left"
            />
            <Link
              href="/portfolio"
              className="text-xs tracking-widest text-ocean-light uppercase hover:text-gold"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <StaggerItem key={listing.id}>
              <ListingCard listing={listing} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Neighborhoods */}
      <SectionWrapper className="bg-sand/50">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <SectionHeading
              label="Oahu Communities"
              title="Explore Neighborhoods"
              align="left"
            />
            <Link
              href="/neighborhoods"
              className="text-xs tracking-widest text-ocean-light uppercase hover:text-gold"
            >
              View All →
            </Link>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              description="Get a complimentary home valuation from a local expert with MBA-level financial insight."
              light
            />
            <ul className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <li>Instant consultation</li>
              <li>·</li>
              <li>Expert advice</li>
              <li>·</li>
              <li>Sell for more</li>
            </ul>
            <Link href="/contact" className="btn-primary mt-10 inline-flex">
              Get a Free Valuation
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
              description="Rooted in trust, expertise, and sincere dedication — serving local and international clients across Oʻahu."
            />
            <Link href="/contact" className="btn-outline-dark mt-10 inline-flex">
              Let&apos;s Connect
            </Link>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
