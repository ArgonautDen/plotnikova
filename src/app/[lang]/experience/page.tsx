import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, GraduationCap, BriefcaseMedical } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrnateCard } from "@/components/decor/OrnateCard";
import { Rosette } from "@/components/decor/ornaments";
import { ICON_STROKE } from "@/components/ui/icons";
import { CertificateCarousel } from "@/components/certificates/CertificateCarousel";
import { carouselLabels, certificateItems } from "@/components/certificates/certificate-items";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.experienceTitle, description: dict.meta.experienceDescription };
}

/** Diplomas and certificates first, then education, then the work timeline. */
export default async function ExperiencePage({ params }: PageProps<"/[lang]/experience">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { experience } = dict;

  return (
    <Section first className="overflow-x-clip">
      <SectionHeading as="h1" eyebrow={experience.eyebrow} title={experience.title} />

      <div id="diplomas" className="flex scroll-mt-28 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-3 font-display text-3xl text-gold-400">
            <Award strokeWidth={ICON_STROKE} className="size-7" aria-hidden="true" />
            {experience.diplomasTitle}
          </h2>
          <p className="text-mist">{experience.diplomasLead}</p>
        </div>
        <CertificateCarousel items={certificateItems(lang)} labels={carouselLabels(dict)} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="flex items-center gap-3 font-display text-3xl text-gold-400">
          <GraduationCap strokeWidth={ICON_STROKE} className="size-7" aria-hidden="true" />
          {experience.educationTitle}
        </h2>
        {experience.education.map((item) => (
          <OrnateCard key={item.title} watermark className="px-7 py-10 sm:px-12">
            <p className="text-sm font-semibold tracking-wide text-gold-400 tabular-nums">{item.period}</p>
            <p className="mt-1 font-display text-2xl text-ivory">{item.title}</p>
            <p className="mt-2 text-mist">{item.text}</p>
          </OrnateCard>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="flex items-center gap-3 font-display text-3xl text-gold-400">
          <BriefcaseMedical strokeWidth={ICON_STROKE} className="size-7" aria-hidden="true" />
          {experience.workTitle}
        </h2>
        <ol className="flex flex-col border-l border-gold-500/30 pl-6 sm:pl-10">
          {experience.work.map((job) => (
            <li key={`${job.period}-${job.title}`} className="relative flex flex-col gap-1 py-5 sm:flex-row sm:gap-10">
              <Rosette className="absolute -left-[2.05rem] top-6 size-4 bg-burgundy-900 text-gold-500 sm:-left-[3.05rem]" />
              <span className="shrink-0 text-sm font-semibold tracking-wide text-gold-400 tabular-nums sm:w-40 sm:pt-1">{job.period}</span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-2xl leading-snug text-ivory">{job.title}</span>
                <span className="text-mist">{job.place}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
