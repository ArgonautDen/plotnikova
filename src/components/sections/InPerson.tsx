import { ExternalLink } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { IVC_URL } from "@/lib/constants";
import { assetPath } from "@/lib/asset-path";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/icons";
import { DrawOn } from "@/components/decor/DrawOn";
import { Rosette } from "@/components/decor/ornaments";

/** Compact strip: IVC logo, a short note about in-person visits, and the booking link. */
export function InPerson({ dict }: { dict: Dictionary }) {
  return (
    <Section id="in-person">
      <DrawOn className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-left">
        <a
          href={IVC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-sm bg-parchment px-6 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer; SVG logo */}
          <img src={assetPath("/images/logo-ivc.svg")} alt={dict.inPerson.logoAlt} width={240} height={56} className="h-11 w-auto" />
        </a>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="draw-fade flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 md:justify-start">
            <Rosette className="size-3.5" />
            {dict.inPerson.eyebrow}
          </p>
          <h2 className="draw-fade text-balance font-display text-3xl leading-tight text-ivory">{dict.inPerson.title}</h2>
          <p className="draw-fade text-pretty text-[15px] text-mist">{dict.inPerson.text}</p>
        </div>
        <div className="draw-fade shrink-0">
          <Button href={IVC_URL} external variant="outline" icon={<ExternalLink strokeWidth={ICON_STROKE} className="size-4" aria-hidden="true" />}>
            {dict.inPerson.link}
          </Button>
        </div>
      </DrawOn>
    </Section>
  );
}
