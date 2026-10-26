import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LogoMark } from "@/components/brand/LogoMark";
import { Container } from "@/components/ui/Container";
import { SectionLink } from "@/components/ui/SectionLink";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const links = [
    { label: dict.nav.about, href: `/${locale}/#about` },
    { label: dict.nav.formats, href: `/${locale}/formats/` },
    { label: dict.nav.reminder, href: `/${locale}/reminder/` },
    { label: dict.nav.experience, href: `/${locale}/experience/` },
    { label: dict.nav.contacts, href: `/${locale}/contacts/` },
  ];

  return (
    <footer className="border-t border-gold-500/15 bg-burgundy-950">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <LogoMark className="h-14 w-auto shrink-0 text-gold-500" />
          <div className="flex flex-col">
            <span className="font-display text-xl uppercase tracking-[0.08em] text-ivory">{dict.hero.name}</span>
            <span className="text-sm text-mist">{dict.footer.role}</span>
          </div>
        </div>
        <nav aria-label={dict.footer.role}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <SectionLink href={link.href} className="text-mist transition-colors hover:text-gold-400">
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="border-t border-gold-500/10 py-5 text-xs text-mist/70">
        © {new Date().getFullYear()} {dict.hero.name}. {dict.footer.rights}
      </Container>
    </footer>
  );
}
