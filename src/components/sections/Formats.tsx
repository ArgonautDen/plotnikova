"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { ICONS, ICON_STROKE } from "@/components/ui/icons";
import { CornerOrnament, Rosette } from "@/components/decor/ornaments";
import { useSingleOpen } from "@/components/ui/use-single-open";

/**
 * Three big format cards (non-urgent, urgent, care plan). Tapping one lays its
 * options over the content below, so the other cards stay put; one at a time.
 */
export function FormatCards({ groups }: { groups: Dictionary["formats"]["groups"] }) {
  const { open, toggle, rootRef } = useSingleOpen<HTMLUListElement>();
  const baseId = useId();

  return (
    <ul ref={rootRef} className="flex flex-wrap items-start gap-5">
      {groups.map((group, index) => {
        const Icon = ICONS[group.icon];
        const isOpen = open === index;
        const panelId = `${baseId}-format-${index}`;
        return (
          <li
            key={group.title}
            className={cn(
              "relative min-w-0 flex-[1_1_16rem] border bg-card transition-colors duration-300",
              isOpen ? "z-20 border-gold-500/60" : "z-0 border-gold-500/20 hover:border-gold-500/45",
            )}
          >
            <CornerOrnament className="pointer-events-none absolute left-2 top-2 size-12 text-gold-500" style={{ ["--delay" as string]: "0.6s" }} />
            <CornerOrnament className="pointer-events-none absolute bottom-2 right-2 size-12 rotate-180 text-gold-500" style={{ ["--delay" as string]: "0.6s" }} />
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="group flex w-full flex-col items-center gap-4 px-6 pb-7 pt-9 text-center focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-400"
            >
              <span
                className={cn(
                  "flex size-24 items-center justify-center rounded-full border transition-colors duration-300",
                  isOpen ? "border-gold-400 bg-gold-500/10 text-gold-400" : "border-gold-500/50 text-gold-500 group-hover:text-gold-400",
                )}
              >
                <Icon strokeWidth={ICON_STROKE} className="size-11" aria-hidden="true" />
              </span>
              <span className="font-display text-3xl text-ivory">{group.title}</span>
              <span className="text-sm text-mist">{group.summary}</span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={ICON_STROKE}
                className={cn("size-5 text-gold-500 transition-transform duration-300", isOpen && "rotate-180")}
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
                <ul className="flex flex-col gap-4 border-t border-gold-500/15 px-6 py-6">
                  {group.options.map((option) => (
                    <li key={option.title} className="flex gap-3">
                      <Rosette className="mt-1 size-4 shrink-0 text-gold-500" />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-ivory">{option.title}</span>
                        <span className="text-[15px] leading-relaxed text-mist">{option.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
