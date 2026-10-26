// Online booking service. Placeholder until the booking link is ready.
export const BOOKING_URL = "#";

// In-person appointments: doctor's page on the MVA Innovative Veterinary Center site.
export const IVC_URL = "https://vetacademy.ru/about/veterinarnye-vrachi/plotnikova-galina-romanovna/";

export const SITE_URL = "https://argonautden.github.io/plotnikova";

// Hero background video (docs/HERO-VIDEO.md). Desktop also serves tablets;
// the vertical cut is for phones. "first" is the loading poster, "last" the
// still shown to visitors who prefer reduced motion.
export const HERO_VIDEO = {
  desktop: {
    webm: "/videos/hero-desktop.webm",
    mp4: "/videos/hero-desktop.mp4",
    first: "/images/hero/hero-desktop-first.jpg",
    last: "/images/hero/hero-desktop-last.jpg",
  },
  mobile: {
    webm: "/videos/hero-mobile.webm",
    mp4: "/videos/hero-mobile.mp4",
    first: "/images/hero/hero-mobile-first.jpg",
    last: "/images/hero/hero-mobile-last.jpg",
  },
} as const;

// Contacts from the business card.
export const CONTACTS = {
  phoneDisplay: "+7 (980) 090-54-00",
  phoneHref: "tel:+79800905400",
  whatsappHref: "https://wa.me/79800905400",
  email: "Plotnikovagalinaromanovna@gmail.com",
} as const;
