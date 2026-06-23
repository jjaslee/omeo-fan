import type { ReactNode } from "react";

type PlaceholderVariant = "light" | "dark" | "neutral";

interface PlaceholderCardProps {
  icon?: ReactNode;
  label: string;
  description?: string;
  variant?: PlaceholderVariant;
  className?: string;
}

const variantStyles: Record<PlaceholderVariant, string> = {
  light: "border-white/15 bg-white/5 text-white",
  dark: "border-navy/10 bg-sky/30 text-navy",
  neutral: "border-sand bg-white text-navy",
};

export function PlaceholderCard({
  icon,
  label,
  description,
  variant = "neutral",
  className = "",
}: PlaceholderCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-sm border px-8 py-12 text-center ${variantStyles[variant]} ${className}`}
    >
      {icon ?? (
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${
            variant === "light"
              ? "border-white/20 text-white/50"
              : "border-navy/10 text-ocean-light/60"
          }`}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      )}
      <p
        className={`text-xs font-medium tracking-[0.2em] uppercase ${
          variant === "light" ? "text-gold" : "text-ocean-light"
        }`}
      >
        {label}
      </p>
      {description && (
        <p
          className={`mt-3 max-w-sm text-sm leading-relaxed ${
            variant === "light" ? "text-white/50" : "text-foreground/55"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface MockupNoticeProps {
  message: string;
  className?: string;
}

/** Subtle client-facing notice for mockup/demo sections */
export function MockupNotice({ message, className = "" }: MockupNoticeProps) {
  return (
    <div
      className={`flex items-start gap-3 rounded-sm border border-ocean/15 bg-sky/40 px-5 py-4 ${className}`}
      role="note"
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean-light"
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </span>
      <p className="text-sm leading-relaxed text-foreground/65">{message}</p>
    </div>
  );
}
