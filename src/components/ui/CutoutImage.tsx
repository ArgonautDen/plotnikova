import { assetPath } from "@/lib/asset-path";

interface CutoutImageProps {
  /** Name in public/images/animals/ without extension (both .webp and .png exist). */
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/** Transparent cutout photo: WebP with a PNG fallback, lazy-loaded. */
export function CutoutImage({ name, alt, width, height, className }: CutoutImageProps) {
  const base = assetPath(`/images/animals/${name}`);
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={`${base}.png`} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={className} />
    </picture>
  );
}
