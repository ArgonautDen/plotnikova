"use client";

import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSingleOpen } from "./use-single-open";
import { Lily } from "@/components/decor/ornaments";

export interface TileItem {
  /** Already-rendered marker: a Lucide icon or a number (JSX crosses the server → client boundary, components don't). */
  marker: ReactNode;
  title: string;
  body: ReactNode;
}

/**
 * Expandable tiles. The details open as a panel laid over the tiles below,
 * so neighbours never stretch or shift; opening one tile smoothly closes the
 * previous one. Escape or a click outside closes it. `decor` adds an ornament
 * after each title: "line" (small ring + fading gold line) or "lily" (a small
 * fleur-de-lis); both are drawn in by a <DrawOn> parent.
 */
export function Tiles({
  items,
  columns = 2,
  decor,
}: {
  items: TileItem[];
  columns?: 1 | 2;
  decor?: "line" | "lily";
}) {
  const { open, toggle, rootRef } = useSingleOpen<HTMLUListElement>();
  const baseId = useId();

  return (
    <ul ref={rootRef} className="flex flex-wrap items-start gap-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <li
            key={item.title}
            className={cn(
              "relative min-w-0 basis-full border bg-card transition-colors duration-300",
              columns === 2 && "md:basis-[calc(50%-0.375rem)]",
              isOpen ? "z-20 border-gold-500/60" : "z-0 border-gold-500/20 hover:border-gold-500/40",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="flex w-full items-center gap-4 px-4 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-400 sm:px-5"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-lg transition-colors duration-300",
                  isOpen ? "border-gold-400 bg-gold-500/10 text-gold-400" : "border-gold-500/40 text-gold-400",
                )}
              >
                {item.marker}
              </span>
              <span className={cn("min-w-0 font-display text-xl leading-snug text-ivory", decor !== "line" && "flex-1")}>
                {item.title}
                {decor === "lily" && <Lily stretch className="lily-fine ml-2.5 inline-block h-[18px] w-[26px] -translate-y-0.5 align-middle text-gold-500" />}
              </span>
              {decor === "line" && (
                <span aria-hidden="true" className="flex min-w-6 flex-1 items-center">
                  <span className="draw-fade size-[5px] shrink-0 rounded-full border border-gold-500" />
                  <span className="draw-line from-left h-px flex-1 bg-linear-to-l from-transparent to-gold-500" />
                </span>
              )}
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.25}
                className={cn("size-5 shrink-0 text-gold-500 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              id={panelId}
              className={cn(
                "absolute -inset-x-px top-full grid border-x border-b bg-card shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)] transition-[grid-template-rows,opacity,border-color] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] border-gold-500/60 opacity-100" : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="flex flex-col gap-2 px-4 pb-5 pt-1 pl-[4.75rem] text-[15px] leading-relaxed text-mist sm:px-5 sm:pl-20">
                  {item.body}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
