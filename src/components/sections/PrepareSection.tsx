import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { PhotoHeading } from "@/components/ui/PhotoHeading";
import { Tiles } from "@/components/ui/Tiles";
import { DrawOn } from "@/components/decor/DrawOn";

/** What to prepare: photo heading with the owners and their dog, then the 17-point checklist. */
export function PrepareSection({ dict, headingAs = "h2" }: { dict: Dictionary; headingAs?: "h1" | "h2" }) {
  const items = dict.prepare.items.map((item, index) => ({
    marker: <span className="tabular-nums">{index + 1}</span>,
    title: item.title,
    body: item.text.map((line) => <p key={line}>{line}</p>),
  }));

  return (
    <Section id="prepare" first={headingAs === "h1"}>
      <PhotoHeading
        as={headingAs}
        eyebrow={dict.prepare.eyebrow}
        title={dict.prepare.title}
        lead={dict.prepare.lead}
        photo={{ name: "owners-dog", alt: dict.prepare.imageAlt, width: 1000, height: 558 }}
        background="#f1f2f1"
      />
      <DrawOn>
        <Tiles items={items} decor="line" />
      </DrawOn>
    </Section>
  );
}
