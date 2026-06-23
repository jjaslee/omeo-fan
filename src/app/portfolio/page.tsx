import { ListingGrid } from "@/components/ListingCard";
import { SectionWrapper } from "@/components/SectionHeading";
import { MockupNotice } from "@/components/ui/PlaceholderCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSoldListings } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import { hasSampleListings } from "@/lib/format";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Sold Portfolio | Oʻahu Real Estate",
  description:
    "View Omeo Fan's sold property portfolio across Honolulu, Kailua, Kapolei, and greater Oʻahu. Past transactions and results to be updated with verified client data.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const sold = getSoldListings();
  const showSampleNotice = hasSampleListings(sold);

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
              A selection of closed transactions across Oʻahu. Portfolio details
              will be updated once verified transaction data is provided.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          {showSampleNotice && (
            <MockupNotice
              className="mb-8"
              message="Portfolio cards below are sample layouts. Real sold properties, prices, and dates will replace these once confirmed with the agent."
            />
          )}
          <ListingGrid listings={sold} />
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
