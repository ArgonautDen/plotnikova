import type { CSSProperties } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BOOKING_URL, IVC_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { DrawOn } from "@/components/decor/DrawOn";
import { CornerOrnament, MedallionDivider, Rosette } from "@/components/decor/ornaments";
import { HeroBackground } from "./HeroBackground";

const delay = (s: number) => ({ ["--delay" as string]: `${s}s` }) as CSSProperties;

/**
 * First screen: the cat-and-dog video with a frosted booking plate over it.
 * Phones: plate on top, the vertical video's animals below it (bottom padding
 * keeps them clear of the plate).
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-start overflow-hidden px-4 pb-[86vw] pt-8 sm:min-h-[calc(100dvh-5rem)] md:justify-center md:px-6 md:py-16">
      <HeroBackground />
      <DrawOn className="relative w-full max-w-[30rem] border border-gold-500/25 bg-burgundy-950/55 px-6 py-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-10 sm:py-12">
        <CornerOrnament className="absolute left-2 top-2 size-12 text-gold-500" style={delay(0.9)} />
        <CornerOrnament className="absolute bottom-2 right-2 size-12 rotate-180 text-gold-500" style={delay(0.9)} />

        <div className="flex flex-col items-center gap-4">
          <MedallionDivider />
          <p className="draw-fade text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">{dict.hero.eyebrow}</p>
          <h1 className="draw-fade text-balance font-display text-[clamp(2rem,5.5vw,3.4rem)] font-medium uppercase leading-[1.05] tracking-[0.04em] text-ivory">
            {dict.hero.name}
          </h1>
          <p className="draw-fade text-pretty text-[15px] text-ivory/80 sm:text-base">{dict.hero.lead}</p>

          <div className="draw-fade mt-3 flex flex-col items-center gap-3" style={delay(0.7)}>
            <Button href={BOOKING_URL} size="lg" icon={<ArrowRight strokeWidth={1.25} className="size-5" />}>
              {dict.common.book}
            </Button>
            <a
              href={IVC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ivory/50 transition-colors duration-300 hover:text-ivory focus-visible:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
            >
              {dict.common.inPerson}
              <ExternalLink strokeWidth={1.25} className="size-3.5" aria-hidden="true" />
              <span className="sr-only">({dict.common.opensInNewTab})</span>
            </a>
          </div>

          <div className="draw-fade mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" style={delay(0.9)}>
            <p className="flex items-center gap-2.5 text-sm font-medium tracking-wide text-ivory">
              <Rosette className="size-4 text-gold-500" />
              {dict.hero.trust}
            </p>
            <Button href={`/${locale}/experience/#diplomas`} variant="ghost">
              {dict.common.diplomas}
            </Button>
          </div>
        </div>
      </DrawOn>
    </section>
  );
}
