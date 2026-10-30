import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPanel } from "@/components/ui/VideoPanel";
import { PANEL_VIDEOS } from "@/lib/constants";
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
      {/* cat-in-glasses clip under a dark filter; the heading sits over the cat (it walks in and sits centre frame) */}
      <VideoPanel video={PANEL_VIDEOS.help} overlayClassName="bg-[radial-gradient(ellipse_70%_75%_at_50%_45%,rgba(17,5,8,0.72),rgba(17,5,8,0.5))]">
        <SectionHeading eyebrow={dict.help.eyebrow} title={dict.help.title} lead={dict.help.lead} className="px-6 py-16 sm:px-12 sm:py-24" />
      </VideoPanel>
      <DrawOn>
        <Tiles items={items} decor="lily" />
      </DrawOn>
    </Section>
  );
}
