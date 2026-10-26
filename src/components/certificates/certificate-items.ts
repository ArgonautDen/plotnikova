import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { certificates } from "@/content/certificates";
import type { CarouselItem, CarouselLabels } from "./CertificateCarousel";

export function certificateItems(locale: Locale): CarouselItem[] {
  return certificates.map((c) => ({
    src: c.src,
    orientation: c.orientation,
    title: c.title[locale],
    meta: c.meta[locale],
  }));
}

export function carouselLabels(dict: Dictionary): CarouselLabels {
  const { prev, next, close, carousel, viewer, empty } = dict.diplomas;
  return { prev, next, close, carousel, viewer, empty };
}
