import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { PhotoHeading } from "@/components/ui/PhotoHeading";
import { Tiles } from "@/components/ui/Tiles";
import { DrawOn } from "@/components/decor/DrawOn";
import { ICONS, ICON_STROKE } from "@/components/ui/icons";

export function Help({ dict }: { dict: Dictionary }) {
  const items = dict.help.items.map((item) => {
    const Icon = ICONS[item.icon];
    return {
      marker: <Icon strokeWidth={ICON_STROKE} className="size-5" aria-hidden="true" />,
      title: item.title,
      body: <p>{item.text}</p>,
    };
  });

  return (
    <Section id="help">
      <PhotoHeading
        eyebrow={dict.help.eyebrow}
        title={dict.help.title}
        lead={dict.help.lead}
        photo={{ name: "cat-glasses", alt: dict.help.imageAlt, width: 1000, height: 430 }}
        background="#f6f6f6"
        pullUp="mt-0 sm:-mt-4"
      />
      <DrawOn>
        <Tiles items={items} decor="lily" />
      </DrawOn>
    </Section>
  );
}
