import Link from "next/link";

const cards = [
  {
    title: "Buy on Oʻahu",
    description:
      "Search available properties and receive guidance tailored to your budget, timeline, and neighborhood preferences.",
    href: "/listings",
    cta: "Browse Listings",
  },
  {
    title: "Sell Your Home",
    description:
      "Prepare your property for market with pricing strategy, presentation advice, and a clear path to closing.",
    href: "/contact?interest=selling",
    cta: "Start a Conversation",
    featured: true,
  },
  {
    title: "Home Valuation",
    description:
      "Request a complimentary consultation to understand your home's position in the current Oʻahu market.",
    href: "/contact?interest=valuation",
    cta: "Request Valuation",
  },
  {
    title: "Relocation",
    description:
      "Moving to or from Hawaiʻi? Get structured support for international and inter-island transitions.",
    href: "/contact?interest=relocation",
    cta: "Relocation Guidance",
  },
];

export function ActionCards() {
  return (
    <div>
      <div className="mb-10 text-center md:mb-12">
        <p className="text-xs tracking-[0.25em] text-ocean-light uppercase">
          How Can We Help
        </p>
        <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">
          Your Next Step on Oʻahu
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group flex flex-col rounded-sm px-7 py-10 transition-all duration-300 sm:px-8 sm:py-11 ${
              card.featured
                ? "bg-ocean text-white shadow-md hover:bg-navy"
                : "border border-sand bg-white hover:border-gold/40 hover:shadow-sm"
            }`}
          >
            <h3
              className={`font-serif text-xl md:text-2xl ${
                card.featured ? "text-gold" : "text-navy"
              }`}
            >
              {card.title}
            </h3>
            <p
              className={`mt-3 flex-1 text-sm leading-relaxed ${
                card.featured ? "text-white/70" : "text-foreground/60"
              }`}
            >
              {card.description}
            </p>
            <span
              className={`mt-6 text-xs tracking-widest uppercase ${
                card.featured
                  ? "text-gold group-hover:text-gold-light"
                  : "text-ocean-light group-hover:text-gold"
              }`}
            >
              {card.cta} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
