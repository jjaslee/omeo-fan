import { ListingGrid } from "@/components/ListingCard";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSoldListings } from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  const sold = getSoldListings();

  return (
    <>
      <section className="bg-navy section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Track Record
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Sold Portfolio
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              A selection of successfully closed transactions across Oʻahu.
              Results that speak to experience and dedication.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          <ListingGrid listings={sold} />
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
