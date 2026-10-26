import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** How a consultation works: four numbered steps. */
export function StepsSection({ dict }: { dict: Dictionary }) {
  return (
    <Section id="steps">
      <SectionHeading eyebrow={dict.steps.eyebrow} title={dict.steps.title} />
      <ol className="flex flex-wrap gap-5">
        {dict.steps.items.map((step, index) => (
          <li key={step.title} className="flex min-w-0 flex-[1_1_14rem] flex-col gap-3 border-t border-gold-500/40 pt-6">
            <span className="font-display text-5xl leading-none text-gold-500 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-2xl text-ivory">{step.title}</h3>
            <p className="text-[15px] leading-relaxed text-mist">{step.text}</p>
            {step.note && (
              <p className="self-start rounded-full border border-gold-500/40 px-3 py-1 text-xs font-medium text-gold-400">{step.note}</p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
