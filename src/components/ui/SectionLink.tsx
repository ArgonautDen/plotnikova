"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SectionLinkProps {
  /** Home-page anchor such as "/ru/#about". */
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}

/**
 * Link to a section of the home page. On the home page it smooth-scrolls on
 * every click, even when the URL already ends with that #hash (a plain Link
 * does nothing then). From other pages it navigates normally.
 */
export function SectionLink({ href, className, children, onNavigate }: SectionLinkProps) {
  const pathname = usePathname();
  const [page, id] = href.split("#");

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    const onHome = pathname.replace(/\/$/, "") === page.replace(/\/$/, "");
    const target = id ? document.getElementById(id) : null;
    if (!onHome || !target || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.history.replaceState(window.history.state, "", `#${id}`);
  };

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
