"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

/** After a language switch renders, fades the new text in and clears the mark. */
export function LangFade({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.langFade !== "out") return;
    root.dataset.langFade = "in";
    const timer = window.setTimeout(() => delete root.dataset.langFade, 600);
    return () => window.clearTimeout(timer);
  }, [locale]);

  return null;
}
