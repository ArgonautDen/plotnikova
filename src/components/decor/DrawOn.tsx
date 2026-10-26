"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DrawOnProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Draws the ornaments inside (.o-s strokes, .draw-line, .draw-fade) once the
 * block scrolls into view. The CSS lives in globals.css under "stroke draw-on".
 */
export function DrawOn({ children, className, as: Tag = "div" }: DrawOnProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.drawn = "";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.drawn = "";
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("draw", className)}>
      {children}
    </Tag>
  );
}
