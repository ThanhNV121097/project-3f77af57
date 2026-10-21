import { useState } from "react";

/**
 * A photo — or the place for one the owner has not given yet.
 *
 * Give the path the picture will have (`/images/team.jpg`) and what it should
 * show. While no file is there (or no path is given), a flat block with the
 * caption stands in; the owner drops a photo on it in the Studio and it is
 * saved at that path. Never a decorated placeholder, never a stock picture.
 *
 * `width`/`height` are the picture's intrinsic size: give them so the browser
 * keeps its place before it loads (no layout shift). `fit` tells the Studio
 * how to show a photo dropped on the empty place before the next build —
 * "contain" for a product, "cover" (default) for a photograph that fills.
 * A product picture goes through <ProductImage> (components/ProductImage.tsx),
 * which uses this for its empty state.
 */
export function Picture({ src, alt, caption, className = "", width, height, loading = "lazy", fit = "cover" }: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fit?: "cover" | "contain";
}) {
  // The block takes its ground from where it sits, not from the site's.
  // Inside a <ProductImage> the tile is --product-ground, which is light in
  // both modes so a cut-out keeps its shading; a block painted --surface
  // there was a dark hole in a lit tile, and one run shipped a grid of four
  // products mixing the two. --picture-ground/--picture-ink are set by
  // whoever owns the frame, and default to the site's own surface and
  // ink-soft in theme.css — defined there rather than as a var() fallback,
  // which CI refuses as hiding an undefined token.
  const [missing, setMissing] = useState(false);
  if (missing || !src) {
    return (
      <div data-picture={src || undefined} data-fit={fit} role="img" aria-label={alt}
        className={`flex items-end bg-[var(--picture-ground)] text-[var(--picture-ink)] ${className}`}>
        <span className="p-4 text-sm">{caption ?? alt}</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className={className} width={width} height={height}
      loading={loading} decoding="async" onError={() => setMissing(true)} />
  );
}
