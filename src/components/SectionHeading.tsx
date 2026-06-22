import type { ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  light = false,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {label && (
        <p
          className={`mb-3 text-xs font-medium tracking-[0.25em] uppercase ${
            light ? "text-gold" : "text-ocean-light"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-light tracking-wide md:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? "text-white/75" : "text-foreground/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
