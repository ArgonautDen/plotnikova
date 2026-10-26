import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centred column. Below xl the right padding leaves room for the scroll rail. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl pl-4 pr-12 sm:pl-6 sm:pr-16 lg:pl-8 xl:px-8", className)}>{children}</div>;
}
