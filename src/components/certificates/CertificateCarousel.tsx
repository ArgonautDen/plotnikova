"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { CertificateFrame } from "./CertificateFrame";

export interface CarouselItem {
  src: string | null;
  orientation: "portrait" | "landscape";
  title: string;
  meta: string;
}

export interface CarouselLabels {
  prev: string;
  next: string;
  close: string;
  carousel: string;
  viewer: string;
  empty: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Swipe/drag helper: horizontal swipe calls onLeft/onRight, a still tap calls onTap. */
function useSwipe(onLeft: () => void, onRight: () => void, onTap?: (target: EventTarget) => void) {
  const start = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  return {
    onPointerDown: (e: ReactPointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY, moved: false };
    },
    onPointerMove: (e: ReactPointerEvent) => {
      if (start.current && Math.abs(e.clientX - start.current.x) > 8) start.current.moved = true;
    },
    onPointerUp: (e: ReactPointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? onLeft : onRight)();
      else if (!s.moved && onTap) onTap(e.target);
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}

function NavButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-500 text-gold-500 transition-colors hover:bg-gold-500 hover:text-burgundy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

/**
 * Coverflow carousel of certificates (variant 1). The active document sits
 * large in the centre; tapping it opens a full-screen viewer where the lily
 * seal dissolves.
 */
export function CertificateCarousel({ items, labels, initial = 0 }: { items: CarouselItem[]; labels: CarouselLabels; initial?: number }) {
  const n = items.length;
  const [index, setIndex] = useState(Math.min(initial, n - 1));
  const [viewer, setViewer] = useState<number | null>(null);
  const [step, setStep] = useState(220);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(n - 1, i))), [n]);
  const view = useCallback((i: number) => setViewer(((i % n) + n) % n), [n]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setStep(Math.min(stage.clientWidth * 0.26, 260));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewer !== null && !dialog.open) dialog.showModal();
    if (viewer === null && dialog.open) dialog.close();
  }, [viewer]);

  const closeViewer = () => {
    if (viewer !== null) go(viewer);
    setViewer(null);
  };

  const stageSwipe = useSwipe(
    () => go(index + 1),
    () => go(index - 1),
    (target) => {
      const el = (target as HTMLElement).closest<HTMLElement>("[data-slide]");
      if (!el) return;
      const i = Number(el.dataset.slide);
      if (i === index) view(i);
      else go(i);
    },
  );
  const viewerSwipe = useSwipe(
    () => viewer !== null && view(viewer + 1),
    () => viewer !== null && view(viewer - 1),
  );

  if (n === 0) return null;
  const current = items[index];
  const shown = viewer !== null ? items[viewer] : null;

  return (
    <div className="flex flex-col items-center">
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.carousel}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "Enter" || e.key === " ") {
            // Without this the same keypress lands on the dialog's close button once focus moves there.
            e.preventDefault();
            view(index);
          }
        }}
        className="relative h-[clamp(320px,54vw,480px)] w-full cursor-grab touch-pan-y select-none overflow-x-clip active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold-400"
        {...stageSwipe}
      >
        {items.map((item, i) => {
          const offset = i - index;
          const distance = Math.abs(offset);
          const hidden = distance > 3;
          return (
            <div
              key={i}
              data-slide={i}
              aria-hidden={distance !== 0}
              className="absolute left-1/2 top-1/2 flex h-full items-center transition-[transform,opacity,filter] duration-600 ease-[cubic-bezier(.22,.8,.2,1)]"
              style={{
                transform: `translate(calc(-50% + ${offset * step}px), -50%) scale(${1 - Math.min(distance, 3) * 0.16})`,
                opacity: hidden ? 0 : distance === 0 ? 1 : 0.55 - (distance - 1) * 0.15,
                filter: distance === 0 ? "none" : "brightness(.7) saturate(.8)",
                zIndex: 20 - distance,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <CertificateFrame
                src={item.src}
                alt={`${item.title}. ${item.meta}`}
                orientation={item.orientation}
                emptyLabel={labels.empty}
                className={cn(item.orientation === "portrait" ? "h-full" : "w-[min(430px,62vw)]", distance === 0 && "cursor-zoom-in")}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 min-h-[3.5em] max-w-xl text-center" aria-live="polite">
        <p className="font-display text-2xl leading-tight text-ivory">{current.title}</p>
        <p className="mt-1 text-sm text-mist">{current.meta}</p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <NavButton label={labels.prev} onClick={() => go(index - 1)} disabled={index === 0}>
          <ArrowLeft strokeWidth={1.25} className="size-5" />
        </NavButton>
        <span className="min-w-16 text-center text-[15px] tracking-[0.08em] text-mist tabular-nums">
          <b className="font-semibold text-ivory">{pad(index + 1)}</b> / {pad(n)}
        </span>
        <NavButton label={labels.next} onClick={() => go(index + 1)} disabled={index === n - 1}>
          <ArrowRight strokeWidth={1.25} className="size-5" />
        </NavButton>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={labels.viewer}
        onClose={closeViewer}
        onKeyDown={(e) => {
          if (viewer === null) return;
          if (e.key === "ArrowLeft") view(viewer - 1);
          if (e.key === "ArrowRight") view(viewer + 1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeViewer();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ivory backdrop:bg-[rgba(12,3,5,0.95)]"
      >
        {shown && viewer !== null && (
          <div className="cert-viewer flex h-full flex-col items-center justify-center gap-4 px-4 pb-6 pt-[calc(4.25rem+env(safe-area-inset-top,0px))]">
            <div className="absolute right-4 top-[calc(0.875rem+env(safe-area-inset-top,0px))]">
              <NavButton label={labels.close} onClick={closeViewer}>
                <X strokeWidth={1.25} className="size-5" />
              </NavButton>
            </div>
            <div
              className="flex min-h-0 w-full flex-1 touch-pan-y items-center justify-center"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeViewer();
              }}
              {...viewerSwipe}
            >
              <CertificateFrame
                key={viewer}
                src={shown.src}
                alt={`${shown.title}. ${shown.meta}`}
                orientation={shown.orientation}
                emptyLabel={labels.empty}
                className={shown.orientation === "portrait" ? "h-full max-w-full" : "w-[min(100%,1000px)]"}
              />
            </div>
            <div className="text-center">
              <p className="font-display text-xl text-ivory">{shown.title}</p>
              <p className="text-sm text-mist">{shown.meta}</p>
            </div>
            <div className="flex items-center gap-4">
              <NavButton label={labels.prev} onClick={() => view(viewer - 1)}>
                <ArrowLeft strokeWidth={1.25} className="size-5" />
              </NavButton>
              <span className="min-w-16 text-center text-[15px] text-mist tabular-nums">
                <b className="font-semibold text-ivory">{pad(viewer + 1)}</b> / {pad(n)}
              </span>
              <NavButton label={labels.next} onClick={() => view(viewer + 1)}>
                <ArrowRight strokeWidth={1.25} className="size-5" />
              </NavButton>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
