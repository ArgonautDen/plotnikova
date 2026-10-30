import type { Dictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPanel } from "@/components/ui/VideoPanel";
import { PANEL_VIDEOS } from "@/lib/constants";
import { Tiles } from "@/components/ui/Tiles";
import { DrawOn } from "@/components/decor/DrawOn";

/** What to prepare: video heading with the owners and their dog, then the 17-point checklist. */
export function PrepareSection({ dict, headingAs = "h2" }: { dict: Dictionary; headingAs?: "h1" | "h2" }) {
  const items = dict.prepare.items.map((item, index) => ({
    marker: <span className="tabular-nums">{index + 1}</span>,
    title: item.title,
    body: item.text.map((line) => <p key={line}>{line}</p>),
  }));

  return (
    <Section id="prepare" first={headingAs === "h1"}>
      {/* owners playing with their dog, under a dark filter; heading centred over it */}
      <VideoPanel video={PANEL_VIDEOS.prepare} overlayClassName="bg-[radial-gradient(ellipse_70%_75%_at_50%_45%,rgba(17,5,8,0.72),rgba(17,5,8,0.5))]">
        <SectionHeading
          as={headingAs}
          eyebrow={dict.prepare.eyebrow}
          title={dict.prepare.title}
          lead={dict.prepare.lead}
          className="px-6 py-16 sm:px-12 sm:py-24"
        />
      </VideoPanel>
      <DrawOn>
        <Tiles items={items} decor="line" />
      </DrawOn>
    </Section>
  );
}
