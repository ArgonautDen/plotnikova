import { TriangleAlert } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { ICON_STROKE } from "@/components/ui/icons";

/** Always open: owners in a hurry must see this without tapping anything. */
export function Urgent({ dict }: { dict: Dictionary }) {
  return (
    <Section id="urgent">
      <SectionHeading eyebrow={dict.urgent.eyebrow} title={dict.urgent.title} lead={dict.urgent.lead} />
      <OrnateCard className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-12">
        <ul className="flex flex-col gap-4">
          {dict.urgent.items.map((item) => (
            <li key={item} className="flex items-start gap-4 text-lg leading-snug text-ivory">
              <TriangleAlert strokeWidth={ICON_STROKE} className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
              <span className="first-letter:uppercase">{item}</span>
            </li>
          ))}
        </ul>
      </OrnateCard>
    </Section>
  );
}
