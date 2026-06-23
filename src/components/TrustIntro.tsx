import { SectionHeading, SectionWrapper } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

interface TrustIntroProps {
  title: string;
  text: string;
}

export function TrustIntro({ title, text }: TrustIntroProps) {
  return (
    <SectionWrapper className="bg-white py-16 md:py-20">
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading label="Oʻahu Real Estate" title={title} />
          <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
            {text.trim()}
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}

interface AreasServedProps {
  areas: string[];
}

export function AreasServed({ areas }: AreasServedProps) {
  return (
    <SectionWrapper className="bg-navy py-16 md:py-20">
      <FadeIn>
        <div className="text-center">
          <SectionHeading
            label="Service Areas"
            title="Areas Served on Oʻahu"
            description="Supporting buyers and sellers across Honolulu and surrounding communities throughout greater Oʻahu."
            light
          />
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
          {areas.map((area) => (
            <li
              key={area}
              className="border border-white/15 px-5 py-2.5 text-sm tracking-wide text-white/80 transition-colors hover:border-gold/40 hover:text-gold"
            >
              {area}
            </li>
          ))}
        </ul>
      </FadeIn>
    </SectionWrapper>
  );
}
