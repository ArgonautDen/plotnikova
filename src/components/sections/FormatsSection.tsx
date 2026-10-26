import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DrawOn } from "@/components/decor/DrawOn";
import { FormatCards } from "./Formats";

/** Three big format cards: non-urgent, urgent, care plan. */
export function FormatsSection({ dict, headingAs = "h2" }: { dict: Dictionary; headingAs?: "h1" | "h2" }) {
  return (
    <Section id="formats" first={headingAs === "h1"}>
      <SectionHeading as={headingAs} eyebrow={dict.formats.eyebrow} title={dict.formats.title} lead={dict.formats.lead} />
      <DrawOn>
        <FormatCards groups={dict.formats.groups} />
      </DrawOn>
    </Section>
  );
}
