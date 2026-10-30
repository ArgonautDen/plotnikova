import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BOOKING_URL, PANEL_VIDEOS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VideoPanel } from "@/components/ui/VideoPanel";
import { MedallionDivider } from "@/components/decor/ornaments";
import { ICON_STROKE } from "@/components/ui/icons";

/**
 * Closing call to action over the black-cat clip. The cat sits on the right,
 * so on wider screens the text sits on the left where the filter is deeper.
 */
export function FinalCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-gold-500/10 py-6">
      <Container>
        <VideoPanel
          video={PANEL_VIDEOS.cta}
          className="mx-auto max-w-4xl"
          overlayClassName="bg-[rgba(17,5,8,0.62)] md:bg-[linear-gradient(90deg,rgba(17,5,8,0.82)_0%,rgba(17,5,8,0.6)_55%,rgba(17,5,8,0.25)_100%)]"
        >
          <div className="flex flex-col items-center gap-5 px-6 py-14 text-center sm:px-12 sm:py-16 md:max-w-xl md:items-start md:text-left">
            <MedallionDivider className="md:max-w-56" />
            <h2 className="draw-fade text-balance font-display text-4xl text-ivory sm:text-5xl">{dict.cta.title}</h2>
            <p className="draw-fade max-w-lg text-pretty text-ivory/85">{dict.cta.text}</p>
            <div className="draw-fade mt-2">
              <Button href={BOOKING_URL} size="lg" icon={<ArrowRight strokeWidth={ICON_STROKE} className="size-5" />}>
                {dict.common.book}
              </Button>
            </div>
          </div>
        </VideoPanel>
      </Container>
    </section>
  );
}
