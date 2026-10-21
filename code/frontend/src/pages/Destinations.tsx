import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import type { Destination, Facet } from "../lib/types";
import MonthBar from "../components/MonthBar";
import Icon from "../components/Icon";

/**
 * All fourteen on one page: a hairline-ruled table, one rule per row, the
 * figure columns right-aligned. Narrowing by region or kind rewrites the
 * running total in days, so a reader with twelve days and a taste for
 * mountains sees their trip as one number.
 */
export default function Destinations() {
  usePageMeta("destinations.title", "destinations.description");
  const [params, setParams] = useSearchParams();
  const region = params.get("region") ?? "";
  const kind = params.get("kind") ?? "";
  const { items, total, loading } = useCollection<Destination>("destinations", { pageSize: 14 });
  const { items: regions } = useCollection<Facet>("regions", { pageSize: 5 });
  const { items: kinds } = useCollection<Facet>("kinds", { pageSize: 6 });
  const cols = useContent<Record<string, string>>("destinations.columns");
  const f = useContent<Record<string, string>>("destinations.filters");
  const units = useContent<Record<string, string>>("destination.units");

  const shown = useMemo(
    () => items.filter((d) => (!region || d.region === region) && (!kind || d.kind === kind)),
    [items, region, kind],
  );
  const days = shown.reduce((t, d) => t + d.days, 0);

  function set(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-12">
      <T k="destinations.eyebrow" as="p" className="label text-ink-soft" />
      <h1 className="mt-3 max-w-[18ch] text-[length:var(--size-h1)]">
        <T k="destinations.headline" />
      </h1>
      <T k="destinations.sub" as="p" className="mt-4 max-w-[52ch] text-ink-soft" />

      {/* The filters, and COMMITMENT 5: the running total in days. */}
      <div className="mt-8 flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <Facets label={f.region} all={f.all} current={region} rows={regions} onPick={(v) => set("region", v)} prefix="region" />
          <Facets label={f.kind} all={f.all} current={kind} rows={kinds} onPick={(v) => set("kind", v)} prefix="kind" />
        </div>
        <p data-testid="filter-total" className="figures shrink-0 text-sm text-ink-soft lg:text-right">
          <span className="text-ink">{shown.length}</span> {f.places} · <span className="text-ink">{days}</span> {f.days}
          <span className="sr-only"> of {total}</span>
        </p>
      </div>

      {loading && <p className="py-10 text-sm text-ink-soft">…</p>}

      {!loading && shown.length === 0 && (
        <div className="py-16">
          <T k="destinations.filters.empty" as="p" className="max-w-[44ch] text-ink-soft" />
          <button
            type="button"
            data-testid="clear-filters"
            onClick={() => setParams(new URLSearchParams(), { replace: true })}
            className="mt-4 inline-flex items-center gap-2 border border-ink px-4 py-2 hover:bg-ink hover:text-ground"
          >
            <T k="destinations.filters.clear" />
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      {!loading && shown.length > 0 && (
        <>
          <div className="mt-6 hidden grid-cols-[1fr_200px_104px_56px_56px_56px] gap-6 border-b border-line pb-2 lg:grid">
            <span className="label text-ink-soft">{cols.place}</span>
            <span className="label text-ink-soft">{cols.months}</span>
            <span className="label text-ink-soft">{cols.airport}</span>
            <span className="label text-right text-ink-soft">{cols.km}</span>
            <span className="label text-right text-ink-soft">{cols.hours}</span>
            <span className="label text-right text-ink-soft">{cols.days}</span>
          </div>
          <ul>
            {shown.map((d) => (
              <li key={d.id} data-record={`destinations:${d.id}`} className="border-b border-line">
                <Link
                  to={`/destinations/${d.id}`}
                  data-testid={`row-${d.id}`}
                  className="group grid grid-cols-1 gap-3 py-5 lg:grid-cols-[1fr_200px_104px_56px_56px_56px] lg:items-center lg:gap-6"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-[22px] leading-none transition-colors duration-[var(--duration-fast)] group-hover:text-ink-soft">
                      {d.name}
                    </span>
                    <span className="truncate text-sm text-ink-soft">{d.avoid}</span>
                  </span>
                  <span className="lg:w-[200px]">
                    <MonthBar avoid={d.avoid_months} label={`${d.name}: ${d.avoid}`} />
                  </span>
                  <span className="figures text-sm text-ink-soft">{d.airport}</span>
                  <span className="figures text-sm text-ink-soft lg:text-right">
                    {d.distance_km} {units.km}
                  </span>
                  <span className="figures text-sm text-ink-soft lg:text-right">
                    {d.hours} {units.h}
                  </span>
                  <span className="figures text-sm lg:text-right">
                    {d.days} {units.d}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Facets({
  label,
  all,
  current,
  rows,
  onPick,
  prefix,
}: {
  label: string;
  all: string;
  current: string;
  rows: Facet[];
  onPick: (v: string) => void;
  prefix: string;
}) {
  const options = [{ id: "", name: all, note: "" }, ...rows];
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="label text-ink-soft">{label}</span>
      {options.map((o) => (
        <button
          key={o.id || "all"}
          type="button"
          data-testid={`filter-${prefix}-${o.id || "all"}`}
          aria-pressed={current === o.id}
          onClick={() => onPick(o.id)}
          className={[
            "border px-3 py-1 text-sm transition-colors duration-[var(--duration-fast)]",
            current === o.id ? "border-ink bg-ink text-ground" : "border-line text-ink-soft hover:border-ink hover:text-ink",
          ].join(" ")}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}
