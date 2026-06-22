import { ListingGrid } from "@/components/ListingCard";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getAllActiveAndPending } from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Listings",
};

export default function ListingsPage() {
  const listings = getAllActiveAndPending();

  return (
    <>
      <section className="bg-navy section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Properties
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Active Listings
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              Explore current properties available on Oʻahu. Contact Omeo for
              private showings and off-market opportunities.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          <ListingGrid listings={listings} showDescription />
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
