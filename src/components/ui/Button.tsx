import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "outline" | "outline-dark" | "ghost";

interface ButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  external?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  "outline-dark": "btn-outline-dark",
  ghost:
    "inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-widest uppercase text-white/70 transition-colors hover:text-gold",
};

export function Button({
  variant = "primary",
  className = "",
  external,
  ...props
}: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  if (external || (typeof props.href === "string" && props.href.startsWith("tel:"))) {
    const { href, ...rest } = props;
    return (
      <a href={href as string} className={classes} {...(rest as ComponentProps<"a">)} />
    );
  }

  return <Link className={classes} {...props} />;
}
