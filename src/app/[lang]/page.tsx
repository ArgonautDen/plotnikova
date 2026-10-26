import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Help } from "@/components/sections/Help";
import { OnlineFit } from "@/components/sections/OnlineFit";
import { InPerson } from "@/components/sections/InPerson";
import { FinalCta } from "@/components/sections/FinalCta";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero locale={lang} dict={dict} />
      <About locale={lang} dict={dict} />
      <Help dict={dict} />
      <OnlineFit locale={lang} dict={dict} />
      <InPerson dict={dict} />
      <FinalCta dict={dict} />
    </>
  );
}
