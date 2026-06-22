import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getNeighborhoodBySlug, getVisibleNeighborhoods } from "@/lib/content/load";
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
  return { title: neighborhood.name };
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) notFound();

  return (
    <>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src={neighborhood.image}
          alt={neighborhood.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-12 lg:px-20">
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
          </FadeIn>
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
              Ask About {neighborhood.name}
            </Link>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  );
}
