import { ListingGrid } from "@/components/ListingCard";
import { PageCta } from "@/components/PageCta";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSoldListings } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Sold Portfolio | Oʻahu Real Estate",
  description:
    "View Omeo Fan's sold property portfolio across Honolulu, Kailua, Kapolei, and greater Oʻahu.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const sold = getSoldListings();

  return (
    <>
      <section className="page-hero-padding bg-navy">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Track Record
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Sold Portfolio
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Closed transactions across Oʻahu. Sample sold-property layouts are
              shown below until verified portfolio details are added.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          <p className="mb-8 text-sm leading-relaxed text-foreground/55">
            The cards below show sample sold-property layouts. Real closed
            transactions, pricing, and dates will replace these previews once
            provided by the agent.
          </p>
          <ListingGrid listings={sold} />
        </FadeIn>
      </SectionWrapper>

      <PageCta
        title="Thinking of Selling?"
        description="Request a complimentary consultation to discuss your home, your timeline, and how to prepare for the Oʻahu market."
        buttonLabel="Schedule a Consultation"
      />
    </>
  );
}
