"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LogoMark } from "@/components/brand/LogoMark";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { Lily } from "@/components/decor/ornaments";
import { SectionLink } from "@/components/ui/SectionLink";

interface HeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  name: string;
}

export function Header({ locale, nav, name }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const items = [
    { label: nav.about, href: `/${locale}/#about` },
    { label: nav.formats, href: `/${locale}/formats/` },
    { label: nav.reminder, href: `/${locale}/reminder/` },
    { label: nav.experience, href: `/${locale}/experience/` },
    { label: nav.contacts, href: `/${locale}/contacts/` },
  ];
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/15 bg-burgundy-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8 2xl:max-w-7xl">
        <Link
          href={`/${locale}/`}
          aria-label={nav.home}
          className="flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
        >
          <LogoMark className="h-9 w-auto shrink-0 text-gold-500 sm:h-11" />
          <span data-lang-text className="hidden truncate font-display xl:hidden 2xl:block text-lg uppercase tracking-[0.08em] text-ivory xs:block">{name}</span>
        </Link>

        <div className="flex items-center gap-3 xl:gap-6">
          <nav data-lang-text className="hidden items-center gap-1 xl:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              const className = cn(
                "group relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gold-400",
                active ? "text-gold-400" : "text-mist hover:text-ivory",
              );
              const content = (
                <>
                  {item.label}
                  {/* fleur-de-lis rises under the label on hover; stays on the current page */}
                  <Lily
                    stretch
                    className={cn(
                      "lily-fine pointer-events-none absolute -bottom-4 left-1/2 h-[18px] w-[26px] -translate-x-1/2 text-gold-500 transition-[opacity,translate] duration-300 ease-out",
                      active
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                    )}
                  />
                </>
              );
              return item.href.includes("#") ? (
                <SectionLink key={item.href} href={item.href} className={className}>
                  {content}
                </SectionLink>
              ) : (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={className}>
                  {content}
                </Link>
              );
            })}
          </nav>
          <LangSwitch locale={locale} label={nav.language} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
            className="flex size-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition-colors hover:bg-gold-500 hover:text-burgundy-950 focus-visible:outline-2 focus-visible:outline-gold-400 xl:hidden"
          >
            {menuOpen ? <X strokeWidth={1.25} className="size-5" /> : <Menu strokeWidth={1.25} className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav data-lang-text id="mobile-menu" className="border-t border-gold-500/15 bg-burgundy-950 xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href}
                  onNavigate={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center border-b border-gold-500/10 font-display text-xl text-ivory transition-colors hover:text-gold-400"
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
