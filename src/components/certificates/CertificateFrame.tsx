import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";
import { LilyPaths } from "@/components/decor/ornaments";

interface CertificateFrameProps {
  src: string | null;
  alt: string;
  orientation: "portrait" | "landscape";
  emptyLabel: string;
  className?: string;
}

/**
 * Parchment frame with a gold double border and a lily seal over the scan.
 * Inside .cert-viewer (full screen) the seal dissolves; see globals.css.
 */
export function CertificateFrame({ src, alt, orientation, emptyLabel, className }: CertificateFrameProps) {
  const portrait = orientation === "portrait";
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "cert-frame relative overflow-hidden rounded-[2px] bg-parchment shadow-[0_22px_48px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,0,0,0.15)]",
        portrait ? "aspect-[210/297]" : "aspect-[297/210]",
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export serves scans as-is
        <img
          src={assetPath(src)}
          alt={alt}
          draggable={false}
          className={cn(
            "absolute object-contain",
            portrait ? "inset-[6.5cqw] h-[calc(100%-13cqw)] w-[calc(100%-13cqw)]" : "inset-[4.6cqw] h-[calc(100%-9.2cqw)] w-[calc(100%-9.2cqw)]",
          )}
        />
      ) : (
        <span className="absolute inset-x-0 bottom-[16%] text-center font-display text-[4cqw] italic text-[#8a6a3a]">{emptyLabel}</span>
      )}
      <span className="cert-border" aria-hidden="true" />
      <svg
        viewBox="0 0 100 106"
        aria-hidden="true"
        className={cn(
          "cert-seal pointer-events-none absolute left-1/2 top-1/2 aspect-[100/106] -translate-x-1/2 -translate-y-1/2 overflow-visible text-gold-600 opacity-90",
          portrait ? "w-[24cqw]" : "w-[15cqw]",
        )}
      >
        <g fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
          <LilyPaths className="" />
        </g>
      </svg>
    </div>
  );
}
