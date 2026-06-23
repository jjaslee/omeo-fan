import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageCtaProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}

export function PageCta({
  title = "Schedule a Consultation",
  description = "Ready to buy, sell, or explore your options on Oʻahu? Omeo Fan is here to help with a complimentary, no-obligation conversation.",
  buttonLabel = "Schedule a Consultation",
  href = "/contact",
}: PageCtaProps) {
  return (
    <section className="border-t border-sand bg-sky/25 section-padding">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl text-navy md:text-3xl">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
            {description}
          </p>
          <Link href={href} className="btn-primary mt-8 inline-flex">
            {buttonLabel}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

export function AreaPageCta({ areaName }: { areaName: string }) {
  return (
    <PageCta
      title={`Ask Omeo About ${areaName}`}
      description={`Interested in ${areaName} real estate? Reach out for a personalized conversation about buying, selling, or relocating in this area.`}
      buttonLabel={`Ask Omeo About ${areaName}`}
      href="/contact"
    />
  );
}
