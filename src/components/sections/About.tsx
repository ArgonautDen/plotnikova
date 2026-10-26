import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { ICONS, ICON_STROKE } from "@/components/ui/icons";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const linkLabels: Record<string, string> = {
    experience: dict.common.allExperience,
    diplomas: dict.common.allDiplomas,
  };

  return (
    <Section id="about">
      <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />
      <p className="mx-auto max-w-3xl text-pretty text-center text-lg leading-relaxed text-ivory/90">{dict.about.text}</p>
      <ul className="flex flex-wrap justify-center gap-5">
        {dict.about.facts.map((fact) => {
          const Icon = ICONS[fact.icon];
          return (
            <li key={fact.title} className="flex min-w-0 flex-[1_1_18rem]">
              <OrnateCard watermark className="flex w-full flex-col px-7 pb-8 pt-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full border border-gold-500/50 text-gold-400">
                    <Icon strokeWidth={ICON_STROKE} className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl text-ivory">{fact.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist">{fact.text}</p>
                  {fact.link && (
                    <Link
                      href={fact.link === "diplomas" ? `/${locale}/experience/#diplomas` : `/${locale}/${fact.link}/`}
                      className="group mt-1 inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-semibold text-ivory transition-colors hover:text-gold-400"
                    >
                      {linkLabels[fact.link]}
                      <ArrowRight strokeWidth={ICON_STROKE} className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </OrnateCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
