import { Link } from "react-router-dom";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import type { Destination } from "../lib/types";
import Reveal from "../components/Reveal";
import MonthBar from "../components/MonthBar";
import { Picture } from "../picture";

/**
 * One photograph per place, large. One treatment throughout: 4:3, filled,
 * no rounding, no shadow — fourteen pictures that read as one guide rather
 * than fourteen stock libraries.
 */
export default function Pictures() {
  usePageMeta("pictures.title", "pictures.description");
  const { items, total, hasMore, loading, loadMore } = useCollection<Destination>("destinations", { pageSize: 8 });
  return (
    <div className="py-12">
      <div className="mx-auto max-w-page px-[var(--gutter)]">
        <T k="pictures.eyebrow" as="p" className="label text-ink-soft" />
        <h1 className="mt-3 text-[length:var(--size-h1)]">
          <T k="pictures.headline" />
        </h1>
        <T k="pictures.sub" as="p" className="mt-4 max-w-[52ch] text-ink-soft" />
        <p className="figures mt-4 text-sm text-ink-soft">{total}</p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-2">
        {items.map((d, i) => (
          <li key={d.id} data-record={`destinations:${d.id}`} className="bg-ground">
            <Reveal delay={(i % 3) * 0.06}>
              <Link to={`/destinations/${d.id}`} className="group block">
                <span className="block aspect-[4/3] overflow-hidden">
                  <Picture
                    src={d.image}
                    alt={d.name}
                    caption={d.name}
                    className="h-full w-full object-cover opacity-85 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                  />
                </span>
                <span className="flex items-baseline justify-between gap-3 px-4 pb-2 pt-3">
                  <span className="font-display text-[22px] leading-none">{d.name}</span>
                  <span className="figures text-sm text-ink-soft">{d.days} d</span>
                </span>
                <span className="block px-4 pb-4">
                  <MonthBar avoid={d.avoid_months} label={`${d.name}: ${d.avoid}`} />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mx-auto max-w-page px-[var(--gutter)] pt-10">
          <button
            type="button"
            data-testid="pictures-more"
            onClick={loadMore}
            disabled={loading}
            className="border border-ink px-5 py-3 transition-colors duration-[var(--duration-fast)] hover:bg-ink hover:text-ground disabled:opacity-60"
          >
            <T k="destinations.more" />
          </button>
        </div>
      )}
    </div>
  );
}
