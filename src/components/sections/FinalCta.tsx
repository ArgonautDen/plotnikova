import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BOOKING_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CutoutImage } from "@/components/ui/CutoutImage";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { MedallionDivider } from "@/components/decor/ornaments";
import { ICON_STROKE } from "@/components/ui/icons";

/** Closing call to action: white card with the black cat sitting on its bottom edge. */
export function FinalCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-gold-500/10 py-6">
      <Container>
        <OrnateCard tone="light" className="mx-auto max-w-4xl px-6 pt-14 sm:px-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:gap-6">
            <div className="flex flex-1 flex-col items-center gap-5 pb-2 text-center md:pb-14">
              <MedallionDivider className="text-gold-600" />
              <h2 className="draw-fade text-balance font-display text-4xl text-burgundy-900 sm:text-5xl">{dict.cta.title}</h2>
              <p className="draw-fade max-w-lg text-pretty text-burgundy-700">{dict.cta.text}</p>
              <div className="draw-fade mt-2">
                <Button href={BOOKING_URL} size="lg" icon={<ArrowRight strokeWidth={ICON_STROKE} className="size-5" />}>
                  {dict.common.book}
                </Button>
              </div>
            </div>
            {/* the black cat sits on the card's bottom edge */}
            <CutoutImage name="cat-black" alt="" width={462} height={700} className="h-auto w-32 shrink-0 sm:w-40 md:w-48" />
          </div>
        </OrnateCard>
      </Container>
    </section>
  );
}
