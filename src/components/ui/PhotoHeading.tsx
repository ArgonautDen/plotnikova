import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";
import { DrawOn } from "@/components/decor/DrawOn";
import { CornerOrnament } from "@/components/decor/ornaments";
import { SectionHeading } from "./SectionHeading";

interface PhotoHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  /** Optional call to action between the lead and the photo. */
  action?: ReactNode;
  /** Photo shot on a plain light background: /images/photos/<name>.webp + .jpg. */
  photo: { name: string; alt: string; width: number; height: number };
  /** The photo's own background tone, so block and photo read as one surface. */
  background: string;
  /** How far the photo tucks up under the lead (its empty top margin), as Tailwind margin classes. */
  pullUp?: string;
}

const CORNERS = ["left-2 top-2", "right-2 top-2 -scale-x-100", "bottom-2 left-2 -scale-y-100", "bottom-2 right-2 rotate-180"];

/**
 * Light section heading on a studio photo: heading on top, the photo below
 * with its edges feathered into a block filled with the photo's own
 * background, gold rosette corners in all four corners.
 */
export function PhotoHeading({ eyebrow, title, lead, as, action, photo, background, pullUp = "-mt-4 sm:-mt-8" }: PhotoHeadingProps) {
  return (
    <DrawOn className="relative overflow-hidden shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
      <div className="absolute inset-0" style={{ backgroundColor: background }} />
      {CORNERS.map((pos) => (
        <CornerOrnament key={pos} className={cn("absolute z-10 size-12 text-gold-600 sm:size-14", pos)} style={{ ["--delay" as string]: "0.9s" }} />
      ))}
      <div className="relative flex flex-col items-center px-6 pt-10 sm:px-12">
        <SectionHeading tone="light" as={as} eyebrow={eyebrow} title={title} lead={lead} className="relative z-[1]" />
        {action && <div className="draw-fade relative z-[1] mt-6">{action}</div>}
        <picture className={cn("block w-full max-w-md lg:max-w-lg", pullUp)}>
          <source srcSet={assetPath(`/images/photos/${photo.name}.webp`)} type="image/webp" />
          <img
            src={assetPath(`/images/photos/${photo.name}.jpg`)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent),linear-gradient(to_bottom,transparent,#000_14%)]"
          />
        </picture>
      </div>
    </DrawOn>
  );
}
