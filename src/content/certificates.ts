import type { Locale } from "@/i18n/config";

export interface Certificate {
  /** Scan path under public/. Originals live in assets/certificates/. */
  src: string | null;
  orientation: "portrait" | "landscape";
  title: Record<Locale, string>;
  /** Issuer · date · hours. */
  meta: Record<Locale, string>;
}

const scan = (slug: string) => `/images/certificates/${slug}.jpg`;

/** Diploma first, then continuing education, then conferences (newest first). */
export const certificates: Certificate[] = [
  {
    src: scan("diploma-msha-2024"),
    orientation: "landscape",
    title: { ru: "Диплом специалиста: ветеринарный врач", en: "Specialist degree: Doctor of Veterinary Medicine" },
    meta: { ru: "РГАУ — МСХА им. К.А. Тимирязева · 2024", en: "Timiryazev Russian State Agrarian University · 2024" },
  },
  {
    src: scan("iva-therapy-certificate-2025"),
    orientation: "landscape",
    title: { ru: "Удостоверение о повышении квалификации «Терапия от А до Я»", en: "Continuing education certificate: Internal medicine from A to Z" },
    meta: { ru: "Международная ветеринарная академия · 2025 · 72 ч", en: "International Veterinary Academy · 2025 · 72 h" },
  },
  {
    src: scan("iva-therapy-module-1-2025"),
    orientation: "portrait",
    title: { ru: "«Терапия от А до Я». Базовый модуль", en: "Internal medicine from A to Z. Basic module" },
    meta: { ru: "Международная ветеринарная академия · 2025", en: "International Veterinary Academy · 2025" },
  },
  {
    src: scan("iva-therapy-module-2-2025"),
    orientation: "portrait",
    title: { ru: "«Терапия от А до Я». Модуль № 2", en: "Internal medicine from A to Z. Module 2" },
    meta: { ru: "Международная ветеринарная академия · 2025", en: "International Veterinary Academy · 2025" },
  },
  {
    src: scan("iva-therapy-module-3-2025"),
    orientation: "portrait",
    title: { ru: "«Терапия от А до Я». Модуль № 3, продвинутый уровень", en: "Internal medicine from A to Z. Module 3, advanced" },
    meta: { ru: "Международная ветеринарная академия · 2025", en: "International Veterinary Academy · 2025" },
  },
  {
    src: scan("iva-ultrasound-certificate-2025"),
    orientation: "landscape",
    title: { ru: "Удостоверение о повышении квалификации «Ультразвуковая диагностика. Максимум»", en: "Continuing education certificate: Ultrasound diagnostics. Maximum" },
    meta: { ru: "Международная ветеринарная академия · 2025 · 72 ч", en: "International Veterinary Academy · 2025 · 72 h" },
  },
  {
    src: scan("iva-ultrasound-basic-2025"),
    orientation: "portrait",
    title: { ru: "УЗИ органов брюшной полости. Базовый уровень", en: "Abdominal ultrasound. Basic level" },
    meta: { ru: "Международная ветеринарная академия · 2025", en: "International Veterinary Academy · 2025" },
  },
  {
    src: scan("iva-ultrasound-advanced-2025"),
    orientation: "portrait",
    title: { ru: "УЗИ органов брюшной полости. Продвинутый уровень", en: "Abdominal ultrasound. Advanced level" },
    meta: { ru: "Международная ветеринарная академия · 2025", en: "International Veterinary Academy · 2025" },
  },
  {
    src: scan("cat-friendly"),
    orientation: "landscape",
    title: { ru: "Сертифицированный специалист Cat Friendly", en: "Certified Cat Friendly specialist" },
    meta: { ru: "Национальная ассоциация медицины кошек", en: "National Association of Feline Medicine" },
  },
  {
    src: scan("dentistry-2023"),
    orientation: "landscape",
    title: { ru: "Мастер-класс «Базовая ветеринарная стоматология»", en: "Masterclass: Basic veterinary dentistry" },
    meta: { ru: "Ветстоматолог.рф · 2023", en: "Vetstomatolog.rf · 2023" },
  },
  {
    src: scan("mmvk-2026"),
    orientation: "landscape",
    title: { ru: "XXXIV Московский международный ветеринарный конгресс", en: "34th Moscow International Veterinary Congress" },
    meta: { ru: "Участие · апрель 2026", en: "Participant · April 2026" },
  },
  {
    src: scan("maine-coon-2026"),
    orientation: "landscape",
    title: { ru: "Монопородная междисциплинарная конференция «Мейн-кун»", en: "Single-breed interdisciplinary conference: Maine Coon" },
    meta: { ru: "Международная ветеринарная академия · март 2026", en: "International Veterinary Academy · March 2026" },
  },
  {
    src: scan("corgi-2026"),
    orientation: "landscape",
    title: { ru: "Монопородная междисциплинарная конференция «Корги»", en: "Single-breed interdisciplinary conference: Corgi" },
    meta: { ru: "Международная ветеринарная академия · май 2026", en: "International Veterinary Academy · May 2026" },
  },
  {
    src: scan("nvc-2025"),
    orientation: "landscape",
    title: { ru: "Национальная ветеринарная конференция NVC", en: "National Veterinary Conference (NVC)" },
    meta: { ru: "Участие · ноябрь 2025", en: "Participant · November 2025" },
  },
  {
    src: scan("mvc-2023"),
    orientation: "landscape",
    title: { ru: "XXXI Московский международный ветеринарный конгресс", en: "31st Moscow International Veterinary Congress" },
    meta: { ru: "Участие · апрель 2023", en: "Participant · April 2023" },
  },
  {
    src: scan("nvc-2023"),
    orientation: "landscape",
    title: { ru: "Национальная ветеринарная конференция NVC", en: "National Veterinary Conference (NVC)" },
    meta: { ru: "Участие · октябрь 2023", en: "Participant · October 2023" },
  },
  {
    src: scan("nvc-2022"),
    orientation: "landscape",
    title: { ru: "Национальная ветеринарная конференция NVC", en: "National Veterinary Conference (NVC)" },
    meta: { ru: "Участие · октябрь 2022", en: "Participant · October 2022" },
  },
  {
    src: scan("nvc-2021"),
    orientation: "landscape",
    title: { ru: "Национальная ветеринарная конференция NVC", en: "National Veterinary Conference (NVC)" },
    meta: { ru: "Участие · октябрь 2021", en: "Participant · October 2021" },
  },
  {
    src: scan("ravc-2021"),
    orientation: "landscape",
    title: { ru: "Российско-американская ветеринарная конференция RAVC", en: "Russian American Veterinary Conference (RAVC)" },
    meta: { ru: "Сочи · июль 2021", en: "Sochi · July 2021" },
  },
];
