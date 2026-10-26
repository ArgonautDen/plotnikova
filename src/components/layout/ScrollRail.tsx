"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { LilyPaths } from "@/components/decor/ornaments";

/**
 * Scroll rail on the right edge (variant 4, docs/DESIGN-REFERENCE.md):
 * a gold line grows down a dotted guide with scroll progress; the lily at the
 * bottom brightens with progress and pulses with gathering "mana".
 */
export function ScrollRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
      rail.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-14 right-[calc(10px+env(safe-area-inset-right,0px))] top-24 z-30 w-8 sm:right-[calc(20px+env(safe-area-inset-right,0px))] sm:top-28"
      style={{ "--p": 0 } as CSSProperties}
    >
      {/* dotted guide */}
      <span className="absolute inset-y-0 right-2 w-px bg-[repeating-linear-gradient(180deg,rgba(197,160,74,0.18)_0_2px,transparent_2px_6px)]" />
      {/* progress line */}
      <span
        className="absolute inset-y-0 right-2 w-px origin-top"
        style={{ transform: "scaleY(var(--p))", background: "linear-gradient(180deg, transparent, #c5a04a 12%)" }}
      />
      {/* tip */}
      <span className="absolute right-[5px] top-[calc(var(--p)*100%)] size-[7px] -translate-y-1/2 rounded-full border border-gold-500 bg-burgundy-900" />
      {/* finale lily */}
      <svg
        viewBox="0 0 100 106"
        className="absolute -bottom-10 -right-[7px] h-[34px] w-8 overflow-visible text-gold-500"
        style={{ "--k": "calc(0.3 + var(--p) * 0.7)" } as CSSProperties}
      >
        <g style={{ opacity: "var(--k)", stroke: "currentColor", strokeWidth: 1.5 }}>
          <LilyPaths className="rail-s" />
        </g>
        <g
          className="rail-charge"
          style={{
            opacity: 0,
            stroke: "#f0d58e",
            strokeWidth: 2.2,
            filter:
              "drop-shadow(0 0 3px rgba(233,201,121,0.9)) drop-shadow(0 0 calc(4px + var(--p) * 10px) rgba(197,160,74,0.75))",
          }}
        >
          <LilyPaths className="rail-s" />
        </g>
        <g style={{ stroke: "#f3dc9a", strokeWidth: 2, filter: "drop-shadow(0 0 2px #e9c979)" }}>
          <LilyPaths className="rail-s rail-spark" />
        </g>
      </svg>
    </div>
  );
}
