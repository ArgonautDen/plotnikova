import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { FormatsSection } from "@/components/sections/FormatsSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[lang]/formats">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.formatsTitle, description: dict.meta.formatsDescription };
}

/** Consultation formats and how a consultation works. */
export default async function FormatsPage({ params }: PageProps<"/[lang]/formats">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <FormatsSection dict={dict} headingAs="h1" />
      <StepsSection dict={dict} />
      <FinalCta dict={dict} />
    </>
  );
}
