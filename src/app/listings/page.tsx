import { ListingFilters } from "@/components/ListingFilters";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getAllActiveAndPending } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Oʻahu Homes for Sale | Active Listings",
  description:
    "Browse active and pending Oʻahu property listings with Omeo Fan, Principal Broker. Contact for showings, off-market opportunities, and buyer guidance in Honolulu and surrounding areas.",
  path: "/listings",
});

export default function ListingsPage() {
  const listings = getAllActiveAndPending();

  return (
    <>
      <section className="page-hero-padding bg-navy">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Properties
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Active Listings
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Explore properties available on Oʻahu. Contact Omeo for private
              showings, buyer representation, and current market availability.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          <ListingFilters listings={listings} />
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
