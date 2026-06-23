import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AreaPageCta } from "@/components/PageCta";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  getNeighborhoodBySlug,
  getVisibleNeighborhoods,
} from "@/lib/content/load";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getVisibleNeighborhoods().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) return { title: "Neighborhood" };
  return buildPageMetadata({
    title: `${neighborhood.name} Real Estate | Oʻahu`,
    description: `Explore ${neighborhood.name} real estate on Oʻahu with Omeo Fan, Principal Broker. Buying and selling guidance in ${neighborhood.name} and surrounding areas.`,
    path: `/neighborhoods/${slug}`,
  });
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) notFound();

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden md:min-h-[50vh]">
        <Image
          src={neighborhood.image}
          alt={`${neighborhood.name}, Oʻahu — neighborhood guide photography`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />
        <div className="page-hero-padding relative z-10 w-full pb-12 md:pb-16">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <Link
                href="/neighborhoods"
                className="text-xs tracking-widest text-gold uppercase hover:text-gold-light"
              >
                ← All Neighborhoods
              </Link>
              <h1 className="mt-6 font-serif text-4xl text-white md:text-6xl">
                {neighborhood.name}
              </h1>
              <p className="mt-3 text-sm text-white/60">
                Real estate on Oʻahu
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4 text-base leading-relaxed text-foreground/70">
              {neighborhood.description.trim().split("\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
            <Link href="/contact" className="btn-primary mt-10 inline-flex">
              Ask Omeo About {neighborhood.name}
            </Link>
          </div>
        </FadeIn>
      </SectionWrapper>

      <AreaPageCta areaName={neighborhood.name} />
    </>
  );
}
