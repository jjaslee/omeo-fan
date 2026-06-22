import Link from "next/link";
import { AgentPortrait } from "@/components/AgentPortrait";
import { SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSiteConfig } from "@/lib/content/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  const site = getSiteConfig();

  return (
    <>
      <section className="bg-navy section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              About
            </p>
            <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl lg:text-6xl">
              Meet {site.agent.name}
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              {site.agent.title} at {site.brokerage.name}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <AgentPortrait
              name={site.agent.name}
              photo={site.about.photo}
              credentials={site.agent.credentials}
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-4 text-base leading-relaxed text-foreground/70">
              {site.about.full.trim().split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-sand pt-10">
              <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                Languages
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {site.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-sky/50 px-4 py-2 text-sm text-navy"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-sand pt-10">
              <h3 className="text-xs tracking-[0.2em] text-ocean-light uppercase">
                Credentials
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                <li>Principal Broker, {site.brokerage.name}</li>
                <li>MBA, Finance & Management — University of Hawaiʻi</li>
                <li>BBA, Accounting & MIS — University of Hawaiʻi</li>
                <li>
                  License{" "}
                  {site.agent.credentials.find((c) => c.startsWith("RB"))}
                </li>
              </ul>
            </div>

            <Link href="/contact" className="btn-primary mt-10 inline-flex">
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>
    </>
  );
}
