import { NeighborhoodCard } from "@/components/NeighborhoodCard";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { getVisibleNeighborhoods } from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighborhoods",
};

export default function NeighborhoodsPage() {
  const neighborhoods = getVisibleNeighborhoods();

  return (
    <>
      <section className="bg-navy section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              Oahu Communities
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              Explore Neighborhoods
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              From urban Honolulu to windward Kailua — discover the communities
              that make Oʻahu unique.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
