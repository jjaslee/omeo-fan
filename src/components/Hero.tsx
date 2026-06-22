"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroFade } from "@/components/motion/HeroFade";

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  headline: string;
  credentials: string[];
}

export function Hero({
  name,
  title,
  tagline,
  headline,
  credentials,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        alt="Oahu coastline"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-ocean/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center md:px-12">
        <HeroFade delay={0.1}>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Your Trusted Real Estate Guide
          </p>
        </HeroFade>

        <HeroFade delay={0.25}>
          <h1 className="mt-6 font-serif text-5xl font-light tracking-wide text-white md:text-7xl lg:text-8xl">
            {name}
          </h1>
        </HeroFade>

        <HeroFade delay={0.4}>
          <p className="mt-4 text-sm tracking-[0.2em] text-white/70 uppercase md:text-base">
            {title} · {credentials.join(" · ")}
          </p>
        </HeroFade>

        <HeroFade delay={0.5}>
          <p className="mt-3 font-serif text-xl text-white/90 md:text-2xl">
            {tagline}
          </p>
        </HeroFade>

        <HeroFade delay={0.6}>
          <p className="mt-2 text-sm text-white/60">{headline}</p>
        </HeroFade>

        <HeroFade delay={0.75}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/listings" className="btn-primary min-w-[180px]">
              Search Homes
            </Link>
            <Link href="/contact" className="btn-outline min-w-[180px]">
              Get Home Value
            </Link>
          </div>
        </HeroFade>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <HeroFade delay={1.2}>
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </HeroFade>
      </div>
    </section>
  );
}
