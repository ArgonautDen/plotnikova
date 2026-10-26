import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { cormorant, montserrat } from "../fonts";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE_URL } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollRail } from "@/components/layout/ScrollRail";
import { LangFade } from "@/components/layout/LangFade";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s — ${dict.hero.name}` },
    description: dict.meta.description,
    alternates: { languages: { ru: "/ru/", en: "/en/" } },
    openGraph: {
      type: "website",
      locale: lang === "ru" ? "ru_RU" : "en_US",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#22090e",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Header locale={lang} nav={dict.nav} name={dict.hero.name} />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} dict={dict} />
        <ScrollRail />
        <LangFade locale={lang} />
      </body>
    </html>
  );
}
