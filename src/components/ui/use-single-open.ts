"use client";

import { useEffect, useRef, useState } from "react";

/** One item open at a time; closes on Escape or a pointer press outside the root. */
export function useSingleOpen<T extends HTMLElement>() {
  const [open, setOpen] = useState<number | null>(null);
  const rootRef = useRef<T>(null);

  useEffect(() => {
    if (open === null) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (index: number) => setOpen((current) => (current === index ? null : index));
  return { open, toggle, rootRef };
}
