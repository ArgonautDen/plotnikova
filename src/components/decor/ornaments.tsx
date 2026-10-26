import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/*
 * Decor variant D "Medallion and damask" (docs/DESIGN-REFERENCE.md).
 * All strokes are line art with pathLength=1 so <DrawOn> can draw them in.
 */

type OrnamentProps = { className?: string; style?: CSSProperties };

/** Fleur-de-lis paths, viewBox 0 0 100 106. */
export function LilyPaths({ className = "o-s" }: { className?: string }) {
  return (
    <>
      <path pathLength={1} className={className} d="M50 2 C41 18 37 36 50 56 C63 36 59 18 50 2 Z" />
      <path pathLength={1} className={className} d="M45 59 C30 63 15 54 15 39 C15 27 30 23 34 33 C37 40 31 45 27 41" />
      <path pathLength={1} className={className} d="M55 59 C70 63 85 54 85 39 C85 27 70 23 66 33 C63 40 69 45 73 41" />
      <rect pathLength={1} className={className} x="33" y="58" width="34" height="8" rx="4" />
      <path pathLength={1} className={className} d="M50 66 C46 76 46 86 50 96 C54 86 54 76 50 66" />
      <path pathLength={1} className={className} d="M42 66 C36 72 34 80 38 86" />
      <path pathLength={1} className={className} d="M58 66 C64 72 66 80 62 86" />
    </>
  );
}

/** `stretch` lets the lily follow the box's aspect ratio (wider or narrower than drawn). */
export function Lily({ className, style, stretch = false }: OrnamentProps & { stretch?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 106"
      preserveAspectRatio={stretch ? "none" : undefined}
      className={cn("overflow-visible", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <LilyPaths />
    </svg>
  );
}

/** Four-petal rosette, used as list marker and in card corners. */
export function Rosette({ className, style }: OrnamentProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("overflow-visible", className)} style={style} aria-hidden="true" focusable="false">
      <circle pathLength={1} className="o-s" cx="12" cy="12" r="2.2" />
      <path pathLength={1} className="o-s" d="M12 9.8 C9.5 6 10 3 12 2 C14 3 14.5 6 12 9.8 Z" />
      <path pathLength={1} className="o-s" d="M12 14.2 C9.5 18 10 21 12 22 C14 21 14.5 18 12 14.2 Z" />
      <path pathLength={1} className="o-s" d="M9.8 12 C6 9.5 3 10 2 12 C3 14 6 14.5 9.8 12 Z" />
      <path pathLength={1} className="o-s" d="M14.2 12 C18 9.5 21 10 22 12 C21 14 18 14.5 14.2 12 Z" />
    </svg>
  );
}

/** Lily inside a double ring with four dots. */
export function Medallion({ className, style }: OrnamentProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("overflow-visible", className)} style={style} aria-hidden="true" focusable="false">
      <circle pathLength={1} className="o-s" cx="50" cy="50" r="44" />
      <circle pathLength={1} className="o-s" cx="50" cy="50" r="39" />
      <circle pathLength={1} className="o-s" cx="50" cy="3" r="1.6" />
      <circle pathLength={1} className="o-s" cx="50" cy="97" r="1.6" />
      <circle pathLength={1} className="o-s" cx="3" cy="50" r="1.6" />
      <circle pathLength={1} className="o-s" cx="97" cy="50" r="1.6" />
      <svg x="27" y="24" width="46" height="49" viewBox="0 0 100 106" overflow="visible">
        <LilyPaths />
      </svg>
    </svg>
  );
}

/** Quarter arcs with a rosette, for the top-left corner; mirror via CSS for others. */
export function CornerOrnament({ className, style }: OrnamentProps) {
  return (
    <svg viewBox="0 0 80 80" className={cn("overflow-visible", className)} style={style} aria-hidden="true" focusable="false">
      <path pathLength={1} className="o-s" d="M2 50 A48 48 0 0 1 50 2" />
      <path pathLength={1} className="o-s" d="M2 36 A34 34 0 0 1 36 2" />
      <path pathLength={1} className="o-s" d="M2 78 V62 M62 2 H78" />
      <svg x="4" y="4" width="18" height="18" viewBox="0 0 24 24" overflow="visible">
        <circle pathLength={1} className="o-s" cx="12" cy="12" r="2.2" />
        <path pathLength={1} className="o-s" d="M12 9.8 C9.5 6 10 3 12 2 C14 3 14.5 6 12 9.8 Z" />
        <path pathLength={1} className="o-s" d="M12 14.2 C9.5 18 10 21 12 22 C14 21 14.5 18 12 14.2 Z" />
        <path pathLength={1} className="o-s" d="M9.8 12 C6 9.5 3 10 2 12 C3 14 6 14.5 9.8 12 Z" />
        <path pathLength={1} className="o-s" d="M14.2 12 C18 9.5 21 10 22 12 C21 14 18 14.5 14.2 12 Z" />
      </svg>
    </svg>
  );
}

/** Fading line · dot · medallion · dot · fading line. Place inside <DrawOn>. */
export function MedallionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full max-w-72 items-center gap-3 text-gold-500", className)} aria-hidden="true">
      <span className="draw-line from-right h-px flex-1 bg-linear-to-r from-transparent to-gold-500" />
      <span className="draw-fade size-[3px] shrink-0 rounded-full bg-gold-500" />
      <Medallion className="size-10 shrink-0" />
      <span className="draw-fade size-[3px] shrink-0 rounded-full bg-gold-500" />
      <span className="draw-line from-left h-px flex-1 bg-linear-to-l from-transparent to-gold-500" />
    </div>
  );
}

/** Large lily in the card's own tone, slightly darker: a watermark. */
export function LilyWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 106"
      className={cn("pointer-events-none absolute left-1/2 top-1/2 aspect-[100/106] w-[min(70%,300px)] -translate-x-1/2 -translate-y-1/2 overflow-visible text-watermark", className)}
      aria-hidden="true"
      focusable="false"
    >
      <LilyPaths className="wm-s" />
    </svg>
  );
}
