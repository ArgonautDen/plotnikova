"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/asset-path";
import { CornerOrnament } from "@/components/decor/ornaments";
import { useReducedMotion } from "./use-reduced-motion";

export interface PanelVideo {
  webm: string;
  mp4: string;
  /** Poster before playback. */
  first: string;
  /** Still for visitors who prefer reduced motion (the clip ends on this frame). */
  last: string;
}

interface VideoPanelProps {
  video: PanelVideo;
  children: ReactNode;
  className?: string;
  /** Darkening filter laid over the video, under the text. */
  overlayClassName?: string;
}

const CORNERS = ["left-2 top-2", "right-2 top-2 -scale-x-100", "bottom-2 left-2 -scale-y-100", "bottom-2 right-2 rotate-180"];

/**
 * Block with a background video under a translucent dark filter, gold rosette
 * corners and the content on top. The clip plays once when the block comes
 * into view and stays on its last frame.
 */
export function VideoPanel({ video, children, className, overlayClassName = "bg-burgundy-950/60" }: VideoPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const el = videoRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!still && el) el.play().catch(() => {});
        root.dataset.drawn = "";
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [still]);

  return (
    <div ref={rootRef} className={cn("draw relative isolate overflow-hidden border border-gold-500/25 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]", className)}>
      {still ? (
        // eslint-disable-next-line @next/next/no-img-element -- decorative still, static export
        <img src={assetPath(video.last)} alt="" aria-hidden="true" className="absolute inset-0 -z-10 size-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster={assetPath(video.first)}
        >
          <source src={assetPath(video.webm)} type="video/webm" />
          <source src={assetPath(video.mp4)} type="video/mp4" />
        </video>
      )}
      <div aria-hidden="true" className={cn("absolute inset-0 -z-10", overlayClassName)} />
      {CORNERS.map((pos) => (
        <CornerOrnament key={pos} className={cn("absolute size-12 text-gold-500 sm:size-14", pos)} style={{ ["--delay" as string]: "0.9s" }} />
      ))}
      <div className="relative">{children}</div>
    </div>
  );
}
