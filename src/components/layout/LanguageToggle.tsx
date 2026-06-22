"use client";

interface LanguageToggleProps {
  chineseEnabled?: boolean;
  variant?: "light" | "dark";
}

export function LanguageToggle({
  chineseEnabled = false,
  variant = "light",
}: LanguageToggleProps) {
  const activeColor = variant === "light" ? "text-gold" : "text-ocean-light";
  const inactiveColor =
    variant === "light" ? "text-white/60 hover:text-white" : "text-navy/40";
  const disabledColor = variant === "light" ? "text-white/30" : "text-navy/25";
  const dividerColor = variant === "light" ? "text-white/30" : "text-navy/20";

  return (
    <div className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
      <span className={activeColor}>EN</span>
      <span className={dividerColor}>|</span>
      {chineseEnabled ? (
        <button
          type="button"
          className={`transition-colors ${inactiveColor}`}
          aria-label="Switch to Chinese"
        >
          中文
        </button>
      ) : (
        <span
          className={`cursor-not-allowed ${disabledColor}`}
          title="Chinese version coming soon"
        >
          中文
        </span>
      )}
    </div>
  );
}
