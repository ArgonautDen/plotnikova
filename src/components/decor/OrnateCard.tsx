import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CornerOrnament, LilyWatermark } from "./ornaments";
import { DrawOn } from "./DrawOn";

interface OrnateCardProps {
  children: ReactNode;
  className?: string;
  /** Lily watermark behind the content (variant D, tone #270B1180). Dark tone only. */
  watermark?: boolean;
  /** "light": near-white surface (matches the studio photos) with deeper gold corners. */
  tone?: "dark" | "light";
}

/** Card with rosette corners (top-left, bottom-right) that draw in on scroll. */
export function OrnateCard({ children, className, watermark = false, tone = "dark" }: OrnateCardProps) {
  const light = tone === "light";
  const corner = light ? "text-gold-600" : "text-gold-500";
  return (
    <DrawOn
      className={cn(
        "relative overflow-hidden border",
        light ? "border-gold-500/40 bg-[#f6f6f6] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]" : "border-gold-500/20 bg-card",
        className,
      )}
    >
      {watermark && !light && <LilyWatermark />}
      <CornerOrnament className={cn("absolute left-2 top-2 size-12 sm:size-14", corner)} style={{ ["--delay" as string]: "0.9s" }} />
      <CornerOrnament className={cn("absolute bottom-2 right-2 size-12 rotate-180 sm:size-14", corner)} style={{ ["--delay" as string]: "0.9s" }} />
      <div className="relative">{children}</div>
    </DrawOn>
  );
}
