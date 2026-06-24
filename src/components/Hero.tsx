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
  brokerage: string;
}

export function Hero({
  name,
  title,
  tagline,
  headline,
  credentials,
  brokerage,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden md:min-h-screen">
      <Image
        src="/images/hero-waikiki.jpg"
        alt="Waikīkī and Honolulu skyline along Oʻahu's south shore"
        fill
        priority
        unoptimized
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-ocean/85"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 pb-20 text-center md:px-12 md:pt-32">
        <HeroFade delay={0.1}>
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase md:text-xs">
            Principal Broker · {brokerage}
          </p>
        </HeroFade>

        <HeroFade delay={0.22}>
          <h1 className="mt-5 font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-7xl lg:text-8xl">
            {name}
          </h1>
        </HeroFade>

        <HeroFade delay={0.35}>
          <p className="mt-4 font-serif text-lg text-white/90 sm:text-xl md:text-2xl">
            {tagline}
          </p>
        </HeroFade>

        <HeroFade delay={0.45}>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/60">
            {headline} · {title} · {credentials.join(" · ")}
          </p>
        </HeroFade>

        <HeroFade delay={0.58}>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mx-auto lg:max-w-3xl">
            <Link href="/listings" className="btn-primary w-full py-4 text-xs">
              Buy a Home on Oʻahu
            </Link>
            <Link
              href="/contact?interest=selling"
              className="btn-outline w-full py-4 text-xs"
            >
              Sell Your Oʻahu Home
            </Link>
            <Link
              href="/contact?interest=valuation"
              className="btn-outline w-full py-4 text-xs sm:col-span-1"
            >
              Request a Home Valuation
            </Link>
            <Link
              href="/contact?interest=relocation"
              className="btn-outline w-full border-gold/40 py-4 text-xs text-gold hover:bg-gold/10 hover:text-gold sm:col-span-1"
            >
              Relocation Guidance
            </Link>
          </div>
        </HeroFade>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <HeroFade delay={1.1}>
          <div className="flex flex-col items-center gap-2 text-white/35">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </HeroFade>
      </div>
    </section>
  );
}
