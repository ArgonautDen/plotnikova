import { cn } from "@/lib/cn";
import { DrawOn } from "@/components/decor/DrawOn";
import { MedallionDivider } from "@/components/decor/ornaments";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
}

/** Medallion divider, eyebrow, title and lead, drawn in on scroll. */
export function SectionHeading({ eyebrow, title, lead, as: Heading = "h2", className }: SectionHeadingProps) {
  return (
    <DrawOn className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <MedallionDivider />
      <p className="draw-fade text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">{eyebrow}</p>
      <Heading className="draw-fade text-balance font-display text-4xl font-medium leading-tight text-ivory sm:text-5xl">
        {title}
      </Heading>
      {lead && <p className="draw-fade mt-1 max-w-2xl text-pretty text-mist">{lead}</p>}
    </DrawOn>
  );
}
