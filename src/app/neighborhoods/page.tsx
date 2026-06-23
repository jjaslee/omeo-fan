import { NeighborhoodCard } from "@/components/NeighborhoodCard";
import { SectionWrapper } from "@/components/SectionHeading";
import { MockupNotice } from "@/components/ui/PlaceholderCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { getVisibleNeighborhoods } from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Oʻahu Neighborhoods | Honolulu, Kailua & More",
  description:
    "Explore Oʻahu neighborhoods including Honolulu, Kailua, Kapolei, and Ewa Beach. Local area guides and market insight from Omeo Fan, Principal Broker.",
  path: "/neighborhoods",
});

export default function NeighborhoodsPage() {
  const neighborhoods = getVisibleNeighborhoods();

  return (
    <>
      <section className="page-hero-padding bg-navy">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Oahu Communities
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Explore Neighborhoods
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              From urban Honolulu to windward Kailua — neighborhood guides and
              local insight across Oʻahu.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <MockupNotice
          className="mb-8"
          message="Neighborhood descriptions are pending client input. Layout and photography previews are shown below."
        />
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <StaggerItem key={n.slug}>
              <NeighborhoodCard neighborhood={n} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>
    </>
  );
}
