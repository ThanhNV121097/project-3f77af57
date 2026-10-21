import { useState, type FormEvent } from "react";
import { T, useContent, useList } from "../editable";
import { usePageMeta } from "../seo";
import { useCollection } from "../data";
import type { Destination } from "../lib/types";
import { subscribe } from "../lib/mock/letter";
import MonthBar from "../components/MonthBar";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

/**
 * The monthly letter. Signing up runs against src/lib/mock/letter.ts in the
 * browser; no list exists behind it yet, and the backend story replaces the
 * mock.
 */
export default function Letter() {
  usePageMeta("letter.title", "letter.description");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [email, setEmail] = useState("");
  const sample = useList<{ line: string }>("letter.sample.items");
  const sampleLabel = useContent<Record<string, string>>("letter.sample");
  const { items } = useCollection<Destination>("destinations", { pageSize: 14 });
  const thisMonth = new Date().getMonth() + 1;
  const thisMonthBad = items.filter((d) => d.avoid_months.includes(thisMonth));
  const bad = [...thisMonthBad, ...items.filter((d) => !thisMonthBad.includes(d))].slice(0, 6);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    await subscribe(email);
    setState("done");
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <T k="letter.eyebrow" as="p" className="label text-ink-soft" />
          <h1 className="mt-3 max-w-[14ch] text-[length:var(--size-h1)]">
            <T k="letter.headline" />
          </h1>
          <T k="letter.sub" as="p" className="mt-4 max-w-[54ch] text-ink-soft" />

          {state === "done" ? (
            <p data-testid="letter-done" className="mt-8 flex items-start gap-3 border-y border-line py-5 text-lg">
              <Icon name="check" size={20} className="mt-1" />
              <T k="letter.done" />
            </p>
          ) : (
            <form onSubmit={(e) => void submit(e)} className="mt-8 max-w-[44ch]">
              <label htmlFor="letter-email" className="label block text-ink-soft">
                <T k="letter.email" />
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="letter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-field bg-ground px-4 py-3 text-ink"
                />
                <button
                  type="submit"
                  data-testid="letter-send"
                  disabled={state === "sending"}
                  className="shrink-0 whitespace-nowrap bg-ink px-5 py-3 text-ground transition-opacity duration-[var(--duration-fast)] hover:opacity-85 disabled:opacity-60"
                >
                  <T k={state === "sending" ? "letter.sending" : "letter.send"} />
                </button>
              </div>
              <T k="letter.promise" as="p" className="mt-3 text-xs text-ink-soft" />
            </form>
          )}

          <Reveal className="mt-14">
            <p className="label text-ink-soft">{sampleLabel.label}</p>
            <h2 className="mt-2 text-[length:var(--size-h2)]">{sampleLabel.heading}</h2>
            <ul className="mt-4 border-t border-line">
              {sample.map((s, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-line py-3">
                  <Icon name="check" size={16} className="mt-1 text-ink-soft" />
                  <T k={`letter.sample.items.${i}.line`} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {bad.length > 0 && (
          <aside className="mt-12 lg:col-span-5 lg:mt-0">
            <T k="home.warnings.label" as="p" className="label text-ink-soft" />
            <ul className="mt-3 border-t border-line">
              {bad.map((d) => (
                <li key={d.id} data-record={`destinations:${d.id}`} className="border-b border-line py-3">
                  <p className="font-display text-[22px] leading-none">{d.name}</p>
                  <div className="mt-2">
                    <MonthBar avoid={d.avoid_months} label={`${d.name}: ${d.avoid}`} />
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
