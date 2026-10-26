import { ArrowRight, Building2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tiles } from "@/components/ui/Tiles";
import { DrawOn } from "@/components/decor/DrawOn";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { Button } from "@/components/ui/Button";
import { ICONS, ICON_STROKE } from "@/components/ui/icons";

export function OnlineFit({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = dict.online.fits.map((item) => {
    const Icon = ICONS[item.icon];
    return {
      marker: <Icon strokeWidth={ICON_STROKE} className="size-5" aria-hidden="true" />,
      title: item.title,
      body: <p>{item.text}</p>,
    };
  });

  return (
    <Section id="online">
      <SectionHeading eyebrow={dict.online.eyebrow} title={dict.online.title} lead={dict.online.lead} />
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-2xl text-gold-400">{dict.online.fitsTitle}</h3>
        <DrawOn>
          <Tiles items={items} decor="lily" />
        </DrawOn>
      </div>
      <OrnateCard className="px-6 py-10 sm:px-12">
        <aside className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <Building2 strokeWidth={ICON_STROKE} className="size-8 shrink-0 text-gold-400" aria-hidden="true" />
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl text-ivory">{dict.online.clinicTitle}</h3>
            <p className="text-pretty leading-relaxed text-mist">{dict.online.clinicText}</p>
          </div>
        </aside>
      </OrnateCard>
      <div className="flex justify-center">
        <Button href={`/${locale}/formats/`} variant="outline" icon={<ArrowRight strokeWidth={ICON_STROKE} className="size-4" aria-hidden="true" />}>
          {dict.online.formatsLink}
        </Button>
      </div>
    </Section>
  );
}
