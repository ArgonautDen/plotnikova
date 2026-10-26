import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "foil" | "outline" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  foil: "foil sheen text-burgundy-950 shadow-[0_14px_32px_-14px_rgba(197,160,74,0.75)] hover:shadow-[0_18px_40px_-12px_rgba(217,185,104,0.85)]",
  outline: "border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-burgundy-950",
  ghost: "rounded-none border-b border-gold-500 px-1 text-ivory hover:text-gold-400",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base sm:min-h-16 sm:px-10 sm:text-lg",
};

/** Stable per-button offset so several glinting buttons never sweep in sync. */
function sheenDelay(seed: string): CSSProperties {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return { ["--sheen-delay" as string]: `-${((hash % 650) / 100).toFixed(2)}s` };
}

/** Pill button rendered as a link (all site actions navigate somewhere). */
export function Button({ href, children, variant = "foil", size = "md", icon, external = false, className }: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 font-semibold tracking-wide transition-colors duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400",
    variant !== "ghost" && "rounded-full",
    variants[variant],
    variant === "ghost" ? "min-h-10 text-[15px]" : sizes[size],
    className,
  );
  const style = variant === "foil" ? sheenDelay(`${href}${className ?? ""}${size}`) : undefined;
  const content = (
    <>
      <span className="text-center">{children}</span>
      {icon && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style}>
      {content}
    </Link>
  );
}
