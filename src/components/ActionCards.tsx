import Link from "next/link";

export function ActionCards() {
  const cards = [
    {
      title: "Buy",
      description: "Find your dream home on Oʻahu with expert guidance.",
      href: "/listings",
      cta: "Search Homes",
    },
    {
      title: "Connect",
      description: "Reach out for a complimentary consultation.",
      href: "/contact",
      cta: "Let's Connect",
      featured: true,
    },
    {
      title: "Sell",
      description: "Get the best price with strategic marketing and local expertise.",
      href: "/contact",
      cta: "Get Valuation",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className={`group flex flex-col items-center rounded-sm px-8 py-12 text-center transition-all duration-300 ${
            card.featured
              ? "bg-ocean text-white hover:bg-navy"
              : "border border-sand bg-white hover:border-gold/50 hover:shadow-md"
          }`}
        >
          <h3
            className={`font-serif text-2xl ${
              card.featured ? "text-gold" : "text-navy"
            }`}
          >
            {card.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
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
  );
}
