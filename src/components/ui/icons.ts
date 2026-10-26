import {
  Activity,
  AlarmClock,
  BookOpen,
  BriefcaseMedical,
  CalendarClock,
  CalendarRange,
  CarFront,
  FlaskConical,
  Globe,
  GraduationCap,
  HeartPulse,
  Hourglass,
  PawPrint,
  Search,
  ShieldCheck,
  Utensils,
  type LucideIcon,
} from "lucide-react";

/** Content dictionaries refer to icons by key; this maps keys to Lucide icons. */
export const ICONS: Record<string, LucideIcon> = {
  education: GraduationCap,
  experience: BriefcaseMedical,
  courses: BookOpen,
  digestion: Utensils,
  tests: FlaskConical,
  chronic: HeartPulse,
  skin: PawPrint,
  senior: Hourglass,
  prevention: ShieldCheck,
  symptoms: Search,
  abroad: Globe,
  stress: CarFront,
  planned: CalendarClock,
  urgent: AlarmClock,
  subscription: CalendarRange,
  monitoring: Activity,
};

/** Thin Lucide stroke from the design system. */
export const ICON_STROKE = 1.25;
