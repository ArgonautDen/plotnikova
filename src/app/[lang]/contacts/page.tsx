import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BOOKING_URL, CONTACTS, IVC_URL, PANEL_VIDEOS } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPanel } from "@/components/ui/VideoPanel";
import { Button } from "@/components/ui/Button";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { ICON_STROKE } from "@/components/ui/icons";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacts">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.contactsTitle, description: dict.meta.contactsDescription };
}

interface ContactCard {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export default async function ContactsPage({ params }: PageProps<"/[lang]/contacts">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contacts;

  const cards: ContactCard[] = [
    { icon: MessageCircle, label: c.whatsapp, value: c.whatsappHint, href: CONTACTS.whatsappHref, external: true },
    { icon: Phone, label: c.phone, value: CONTACTS.phoneDisplay, href: CONTACTS.phoneHref },
    { icon: Mail, label: c.email, value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { icon: MapPin, label: c.inPersonTitle, value: c.inPersonText, href: IVC_URL, external: true },
  ];

  return (
    <Section first>
      {/* dog with a telephone receiver, under a dark filter; heading and booking button centred over it */}
      <VideoPanel video={PANEL_VIDEOS.contacts} overlayClassName="bg-[radial-gradient(ellipse_70%_75%_at_50%_45%,rgba(17,5,8,0.72),rgba(17,5,8,0.5))]">
        <div className="flex flex-col items-center gap-6 px-6 py-16 sm:px-12 sm:py-20">
          <SectionHeading as="h1" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <div className="draw-fade">
            <Button href={BOOKING_URL} size="lg" icon={<ArrowRight strokeWidth={ICON_STROKE} className="size-5" aria-hidden="true" />}>
              {dict.common.book}
            </Button>
          </div>
        </div>
      </VideoPanel>

      <ul className="flex flex-wrap gap-5">
        {cards.map(({ icon: Icon, label, value, href, external }) => (
          <li key={label} className="flex min-w-0 flex-[1_1_15rem]">
            <OrnateCard watermark className="w-full transition-colors hover:border-gold-500/50">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col items-center gap-3 px-6 pb-8 pt-11 text-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-400"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-gold-500/50 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-burgundy-950">
                  <Icon strokeWidth={ICON_STROKE} className="size-6" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">{label}</span>
                <span className="font-display text-xl leading-snug text-ivory [overflow-wrap:anywhere]">
                  {/* let a long email wrap before the @, never mid-word */}
                  {value.includes("@") ? (
                    <>
                      {value.split("@")[0]}
                      <wbr />@{value.split("@")[1]}
                    </>
                  ) : (
                    value
                  )}
                </span>
                {external && <ExternalLink strokeWidth={ICON_STROKE} className="size-4 text-mist" aria-hidden="true" />}
              </a>
            </OrnateCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
