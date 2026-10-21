import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import type { Destination, Facet } from "../lib/types";
import MonthBar from "../components/MonthBar";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { Picture } from "../picture";

/** The four places across the top band, in the order the first screen shows them. */
const BAND = ["ha-giang", "hoi-an", "con-dao", "moc-chau"];

/** "Jun–Aug" from the month numbers, in the month names content.json carries. */
function monthRange(avoid: number[], names: string[]): string {
  if (avoid.length === 0) return "";
  const first = names[avoid[0] - 1];
  const last = names[avoid[avoid.length - 1] - 1];
  return avoid.length === 1 ? first : `${first}–${last}`;
}

export default function Home() {
  const { items } = useCollection<Destination>("destinations", { pageSize: 14 });
  const monthNames = useContent<string[]>("months.long");
  const { items: kindRows } = useCollection<Facet>("kinds", { pageSize: 5 });
  const band = BAND.map((id) => items.find((d) => d.id === id)).filter(Boolean) as Destination[];
  const warnings = items.filter((d) => BAND.includes(d.id));
  const ctaLabel = useContent<string>("home.cta.label");

  return (
    <>
      {/* COMMITMENT 1: four photographs edge to edge, touching, no container. */}
      <section className="border-b border-line">
        <div className="grid grid-cols-2 lg:h-[40vh] lg:min-h-[280px] lg:grid-cols-6">
          {band.map((d, i) => (
            <Link
              key={d.id}
              to={`/destinations/${d.id}`}
              style={{ animationDelay: `${i * 80}ms` }}
              className={[
                "band-in group relative block aspect-[3/2] overflow-hidden lg:aspect-auto lg:h-full",
                i === 0 ? "lg:col-span-3" : "lg:col-span-1",
              ].join(" ")}
            >
              <Picture
                src={d.image}
                alt={d.name}
                loading="eager"
                className="h-full w-full object-cover opacity-85 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[linear-gradient(to_top,var(--ground),transparent)] p-3 lg:p-4">
                <span className="font-display text-base lg:text-lg">{d.name}</span>
                <span className="label figures text-ink-soft">{d.days}d</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The words and the first warning rows, on flat jade. */}
      <section className="mx-auto max-w-page px-[var(--gutter)] pt-10 lg:pt-14">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <T k="home.eyebrow" as="p" className="label rise-in text-ink-soft" />
            <h1 className="rise-in mt-3 max-w-[16ch] text-[length:var(--size-h1)]" style={{ animationDelay: "90ms" }}>
              <T k="home.headline" />
            </h1>
            <T
              k="home.sub"
              as="p"
              className="rise-in mt-5 max-w-[52ch] text-ink-soft"
            />
            <Link
              to="/destinations"
              data-testid="see-all-fourteen"
              className="rise-in mt-7 inline-flex items-center gap-2 bg-ink px-5 py-3 text-ground transition-opacity duration-[var(--duration-fast)] hover:opacity-85"
              style={{ animationDelay: "180ms" }}
              aria-label={ctaLabel}
            >
              <T k="home.cta.label" />
              <Icon name="next" size={18} />
            </Link>
          </div>

          {/* COMMITMENT 2 + 3: the twelve-month bar, yellow only as a warning. */}
          <div className="rise-in mt-10 lg:col-span-5 lg:mt-0" style={{ animationDelay: "240ms" }}>
            <T k="home.warnings.label" as="p" className="label text-ink-soft" />
            <ul className="mt-3 border-t border-line">
              {warnings.map((d) => (
                <li key={d.id} data-record={`destinations:${d.id}`} className="border-b border-line py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link to={`/destinations/${d.id}`} className="font-display text-[22px] leading-none hover:text-ink-soft">
                      {d.name}
                    </Link>
                    <span className="figures label text-accent">{monthRange(d.avoid_months, monthNames)}</span>
                  </div>
                  <div className="mt-2">
                    <MonthBar avoid={d.avoid_months} label={`${d.name}: ${d.avoid}`} />
                  </div>
                </li>
              ))}
            </ul>
            <T k="home.warnings.note" as="p" className="mt-3 max-w-[40ch] text-xs text-ink-soft" />
          </div>
        </div>
      </section>

      {/* Five kinds of trip. */}
      <section className="mx-auto mt-20 max-w-page px-[var(--gutter)]">
        <Reveal>
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <T k="home.kinds.label" as="p" className="label text-ink-soft" />
              <T k="home.kinds.heading" as="h2" className="mt-2 text-[length:var(--size-h2)]" />
              <T k="home.kinds.note" as="p" className="mt-3 max-w-[34ch] text-sm text-ink-soft" />
            </div>
            <ul className="mt-8 border-t border-line lg:col-span-9 lg:mt-0">
              {kindRows.map((k) => {
                const n = items.filter((d) => d.kind === k.id);
                const days = n.reduce((t, d) => t + d.days, 0);
                return (
                  <li key={k.id} data-record={`kinds:${k.id}`} className="border-b border-line">
                    <Link
                      to={`/destinations?kind=${k.id}`}
                      className="group flex items-baseline justify-between gap-6 py-5 transition-colors duration-[var(--duration-fast)] hover:text-ink-soft"
                    >
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-display text-[22px] leading-none">{k.name}</span>
                        <span className="text-sm text-ink-soft">{k.note}</span>
                      </span>
                      <span className="figures shrink-0 text-right text-sm text-ink-soft">
                        {n.length} · {days}d
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* The letter. */}
      <section className="mt-20 border-t border-line bg-surface">
        <Reveal className="mx-auto max-w-page px-[var(--gutter)] py-14 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T k="home.letter.label" as="p" className="label text-ink-soft" />
          </div>
          <div className="lg:col-span-9">
            <T k="home.letter.heading" as="h2" className="text-[length:var(--size-h2)]" />
            <T k="home.letter.sub" as="p" className="mt-3 max-w-[56ch] text-ink-soft" />
            <Link
              to="/letter"
              className="mt-6 inline-flex items-center gap-2 border border-ink px-5 py-3 transition-colors duration-[var(--duration-fast)] hover:bg-ink hover:text-ground"
            >
              <T k="home.letter.cta" />
              <Icon name="mail" size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
