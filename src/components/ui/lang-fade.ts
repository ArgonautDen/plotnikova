/*
 * Language switch cross-fade. The switch marks <html data-lang-fade="out">,
 * text fades out (CSS in globals.css), the router swaps the language, and
 * LangFade flips the mark to "in" so the new text fades in.
 */
export const LANG_FADE_OUT_MS = 260;

/** Starts the fade-out; returns how long to wait before navigating (0 with reduced motion). */
export function startLangFadeOut(): number {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  document.documentElement.dataset.langFade = "out";
  return LANG_FADE_OUT_MS;
}
