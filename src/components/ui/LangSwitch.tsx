"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { locales, type Locale } from "@/i18n/config";
import { LANG_FADE_OUT_MS, startLangFadeOut } from "./lang-fade";

/**
 * Rounded segmented RU | EN switch. The gold pill slides to the chosen
 * language while the page text fades out, then the other language fades in
 * at the same scroll position (see LangFade).
 */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [target, setTarget] = useState<Locale>(locale);
  const [prevLocale, setPrevLocale] = useState(locale);
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setTarget(locale);
  }
  // usePathname() has no basePath; drop the leading /<locale> segment.
  const rest = pathname.replace(/^\/(ru|en)(?=\/|$)/, "") || "/";
  const hrefFor = (code: Locale) => `/${code}${rest === "/" ? "/" : rest}${typeof window !== "undefined" ? window.location.hash : ""}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>, code: Locale) => {
    if (code === locale || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setTarget(code);
    const delay = startLangFadeOut();
    window.setTimeout(() => router.push(hrefFor(code), { scroll: false }), delay);
  };

  const index = locales.indexOf(target);

  return (
    <nav aria-label={label} className="relative inline-grid shrink-0 grid-cols-2 rounded-full border border-gold-500/30 p-[3px]">
      <span
        aria-hidden="true"
        className="absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-full bg-gold-500 transition-transform ease-[cubic-bezier(.65,0,.35,1)]"
        style={{ transform: `translateX(${index * 100}%)`, transitionDuration: `${LANG_FADE_OUT_MS + 100}ms` }}
      />
      {locales.map((code) => {
        const active = code === target;
        return (
          <Link
            key={code}
            href={`/${code}${rest === "/" ? "/" : rest}`}
            hrefLang={code}
            lang={code}
            scroll={false}
            onClick={(e) => onClick(e, code)}
            aria-current={code === locale ? "true" : undefined}
            className={cn(
              "relative rounded-full px-3.5 py-2 text-center text-[13px] font-semibold uppercase leading-none tracking-[0.1em] transition-colors duration-300",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
              active ? "text-burgundy-950" : "text-mist hover:text-ivory",
            )}
          >
            {code}
          </Link>
        );
      })}
    </nav>
  );
}
