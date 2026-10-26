"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { HERO_VIDEO } from "@/lib/constants";
import { assetPath } from "@/lib/asset-path";

type Variant = "desktop" | "mobile";

/**
 * Hero backdrop: the cat-and-dog video plays once and stays on its last
 * frame (docs/HERO-VIDEO.md). Desktop cut for tablets and up, vertical cut
 * for phones (anchored to the bottom, under the booking plate). Visitors who
 * prefer reduced motion get the last frame as a still.
 */
export function HeroBackground() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setVariant(phone.matches ? "mobile" : "desktop");
      setStill(reduced.matches);
    };
    sync();
    phone.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      phone.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const media = variant ? HERO_VIDEO[variant] : null;
  const placement =
    variant === "mobile"
      ? "absolute inset-x-0 bottom-0 h-auto w-full"
      : "absolute inset-0 size-full object-cover object-[50%_60%]";

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {media &&
        (still ? (
          // eslint-disable-next-line @next/next/no-img-element -- decorative still, static export
          <img src={assetPath(media.last)} alt="" className={placement} />
        ) : (
          <video
            key={variant}
            className={placement}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={assetPath(media.first)}
          >
            <source src={assetPath(media.webm)} type="video/webm" />
            <source src={assetPath(media.mp4)} type="video/mp4" />
          </video>
        ))}
      {/* blend the video's own backdrop into the site's burgundy: top under the header, bottom into the next section */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-burgundy-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-burgundy-900 to-transparent" />
      <div
        className={cn(
          "absolute inset-0",
          variant === "mobile"
            ? "bg-[linear-gradient(180deg,var(--color-burgundy-900)_0%,transparent_45%)]"
            : "bg-[radial-gradient(ellipse_80%_90%_at_50%_55%,transparent_55%,rgba(34,9,14,0.75)_100%)]",
        )}
      />
    </div>
  );
}
