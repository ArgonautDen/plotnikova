import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Page section: compact vertical rhythm (24px each side, so 48px between
 * blocks with the hairline in the middle). `first` is the opening section of
 * a page: no hairline and more room under the header.
 */
export function Section({ id, children, className, first = false }: { id?: string; children: ReactNode; className?: string; first?: boolean }) {
  return (
    <section id={id} className={cn(first ? "pb-6 pt-12 sm:pt-16" : "border-t border-gold-500/10 py-6", className)}>
      <Container className="flex flex-col gap-8 sm:gap-10">{children}</Container>
    </section>
  );
}
