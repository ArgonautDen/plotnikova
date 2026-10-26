import { cn } from "@/lib/cn";
import { DrawOn } from "@/components/decor/DrawOn";
import { MedallionDivider } from "@/components/decor/ornaments";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  /** "light" for headings on a light (photo) background. */
  tone?: "dark" | "light";
  className?: string;
}

/** Medallion divider, eyebrow, title and lead, drawn in on scroll. */
export function SectionHeading({ eyebrow, title, lead, as: Heading = "h2", tone = "dark", className }: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <DrawOn className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <MedallionDivider className={light ? "text-gold-600" : undefined} />
      <p className={cn("draw-fade text-xs font-semibold uppercase tracking-[0.2em]", light ? "text-gold-600" : "text-gold-500")}>{eyebrow}</p>
      <Heading
        className={cn(
          "draw-fade text-balance font-display text-4xl font-medium leading-tight sm:text-5xl",
          light ? "text-burgundy-900" : "text-ivory",
        )}
      >
        {title}
      </Heading>
      {lead && <p className={cn("draw-fade mt-1 max-w-2xl text-pretty", light ? "text-burgundy-700" : "text-mist")}>{lead}</p>}
    </DrawOn>
  );
}
