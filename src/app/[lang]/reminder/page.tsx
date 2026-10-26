import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PrepareSection } from "@/components/sections/PrepareSection";
import { Urgent } from "@/components/sections/Urgent";

export async function generateMetadata({ params }: PageProps<"/[lang]/reminder">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.reminderTitle, description: dict.meta.reminderDescription };
}

/** Reminder for owners: what to prepare, and when not to wait for a consultation. */
export default async function ReminderPage({ params }: PageProps<"/[lang]/reminder">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PrepareSection dict={dict} headingAs="h1" />
      <Urgent dict={dict} />
    </>
  );
}
