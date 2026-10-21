import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection, useRecord } from "../data";
import { usePageMeta } from "../seo";
import type { Destination as Place, Facet } from "../lib/types";
import MonthBar from "../components/MonthBar";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { Picture } from "../picture";

/**
 * One place. The photograph runs full-bleed to both edges; the avoid line is
 * above the fold, in yellow, before anything good is said; the facts sit in
 * a right-aligned figure column so the digits line up across places.
 */
export default function Destination() {
  const { id } = useParams();
  const { item } = useRecord<Place>("destinations", id);
  const { items: all } = useCollection<Place>("destinations", { pageSize: 14 });
  const { items: regions } = useCollection<Facet>("regions", { pageSize: 5 });
  const { items: kinds } = useCollection<Facet>("kinds", { pageSize: 6 });
  const labels = useContent<Record<string, string>>("destination");
  const figures = useContent<Record<string, string>>("destination.figures");
  const units = useContent<Record<string, string>>("destination.units");
  usePageMeta("destinations.title", "destinations.description");

  if (!item) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-24">
        <T k="destination.notfound.heading" as="h1" className="text-[length:var(--size-h2)]" />
        <T k="destination.notfound.sub" as="p" className="mt-3 max-w-[44ch] text-ink-soft" />
        <Link to="/destinations" className="mt-6 inline-flex items-center gap-2 border border-ink px-4 py-2 hover:bg-ink hover:text-ground">
          <T k="destination.notfound.cta" />
          <Icon name="next" size={16} />
        </Link>
      </div>
    );
  }

  const region = regions.find((r) => r.id === item.region);
  const kind = kinds.find((k) => k.id === item.kind);
  const nearby = all.filter((d) => d.region === item.region && d.id !== item.id).slice(0, 3);

  return (
    <article data-record={`destinations:${item.id}`}>
      {/* COMMITMENT 6: the photograph bleeds to both edges at 56vh. */}
      <header className="relative h-[56vh] min-h-[320px] w-full overflow-hidden border-b border-line">
        <Picture src={item.image} alt={item.name} loading="eager" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,var(--ground),transparent)]">
          <div className="mx-auto max-w-page px-[var(--gutter)] pb-6 pt-16">
            <p className="label text-ink-soft">
              {region?.name} · {kind?.name}
            </p>
            <h1 className="mt-2 text-[length:var(--size-h1)]">{item.name}</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-page px-[var(--gutter)]">
        {/* COMMITMENT 7: the avoid line first, in yellow, above the fold. */}
        <p data-testid="avoid-line" className="flex items-start gap-3 border-b border-line py-5 text-accent">
          <Icon name="alert" size={20} className="mt-1" />
          <span>
            <span className="label mr-2">{labels.avoid}</span>
            <span className="text-ink">{item.avoid}</span>
          </span>
        </p>

        <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Section label={labels.known}>
              <p className="max-w-[62ch] text-lg">{item.known_for}</p>
            </Section>
            <Section label={labels.best}>
              <p className="font-display text-[22px] leading-tight">{item.best_months}</p>
              <p className="mt-2 max-w-[62ch] text-ink-soft">{item.best_note}</p>
            </Section>
            <Section label={labels.getting}>
              <p className="max-w-[62ch]">{item.getting_there}</p>
            </Section>
            <Section label={labels.opinion}>
              <p className="max-w-[62ch] border-l-2 border-line pl-5 text-lg">{item.opinion}</p>
            </Section>
          </div>

          {/* The figure column: right-aligned, tabular, one row per fact. */}
          <aside className="mt-10 lg:col-span-5 lg:mt-0">
            <dl className="border-t border-line">
              <Fact icon="web" term={figures.airport} value={item.airport} />
              <Fact icon="address" term={figures.distance} value={`${item.distance_km} ${units.km}`} />
              <Fact icon="hours" term={figures.hours} value={`${item.hours} ${units.h}`} />
              <Fact icon="date" term={figures.days} value={`${item.days} ${units.days}`} />
            </dl>
            {/* COMMITMENT 2: the month bar again, large, at the top of the page. */}
            <div className="mt-8">
              <p className="label text-ink-soft">{labels.months}</p>
              <div className="mt-3">
                <MonthBar avoid={item.avoid_months} size="lg" label={`${item.name}: ${item.avoid}`} />
              </div>
              <p className="mt-2 text-xs text-ink-soft">{labels.months_note}</p>
            </div>
          </aside>
        </div>

        {nearby.length === 3 && (
          <Reveal className="mt-20 border-t border-line pt-8">
            <p className="label text-ink-soft">{labels.nearby}</p>
            <ul className="mt-4 grid gap-6 sm:grid-cols-3">
              {nearby.map((d) => (
                <li key={d.id} data-record={`destinations:${d.id}`}>
                  <Link to={`/destinations/${d.id}`} className="group block">
                    <span className="block aspect-[4/3] overflow-hidden">
                      <Picture
                        src={d.image}
                        alt={d.name}
                        className="h-full w-full object-cover opacity-85 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-3 flex items-baseline justify-between gap-3">
                      <span className="font-display text-[22px] leading-none">{d.name}</span>
                      <span className="figures text-sm text-ink-soft">{d.days} d</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Link to="/destinations" className="mt-16 inline-flex items-center gap-2 text-ink-soft hover:text-ink">
          <Icon name="back" size={16} />
          <T k="destination.back" />
        </Link>
      </div>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-10 lg:grid lg:grid-cols-[120px_1fr] lg:gap-8">
      {/* COMMITMENT 8: the label sits in the left margin, beside its text. */}
      <p className="label mb-2 text-ink-soft lg:mb-0 lg:pt-2">{label}</p>
      <div>{children}</div>
    </Reveal>
  );
}

function Fact({ icon, term, value }: { icon: "web" | "address" | "hours" | "date"; term: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3">
      <dt className="flex items-center gap-2 text-sm text-ink-soft">
        <Icon name={icon} size={16} />
        {term}
      </dt>
      <dd className="figures text-right">{value}</dd>
    </div>
  );
}
