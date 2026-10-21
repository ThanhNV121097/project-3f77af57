import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { Picture } from "../picture";

interface Person { id: string; name: string; role: string; bio: string; image: string }
interface Voice { id: string; quote: string; who: string; where: string }

/**
 * Who is behind the guide. The two founders and the readers' lines are
 * collections with their rows waiting: the owner has given no names, no
 * photographs and no reader quotes, and nothing here is invented for them.
 */
export default function About() {
  usePageMeta("about.title", "about.description");
  const { items: team } = useCollection<Person>("team", { pageSize: 4 });
  const { items: voices } = useCollection<Voice>("voices", { pageSize: 6 });
  const t = useContent<Record<string, string>>("about.team");
  const v = useContent<Record<string, string>>("about.voices");

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-12">
      <T k="about.eyebrow" as="p" className="label text-ink-soft" />
      <h1 className="mt-3 max-w-[16ch] text-[length:var(--size-h1)]">
        <T k="about.headline" />
      </h1>
      <T k="about.sub" as="p" className="mt-4 max-w-[56ch] text-ink-soft" />

      <Reveal className="mt-16 lg:grid lg:grid-cols-[120px_1fr] lg:gap-8">
        <T k="about.story.label" as="p" className="label mb-2 text-ink-soft lg:mb-0 lg:pt-2" />
        <div className="max-w-[62ch]">
          <T k="about.story.heading" as="h2" className="text-[length:var(--size-h2)]" />
          <T k="about.story.body" as="p" className="mt-4" />
          <T k="about.story.body2" as="p" className="mt-4 text-ink-soft" />
        </div>
      </Reveal>

      <Reveal className="mt-20 lg:grid lg:grid-cols-[120px_1fr] lg:gap-8">
        <p className="label mb-2 text-ink-soft lg:mb-0 lg:pt-2">{t.label}</p>
        <div>
          <h2 className="text-[length:var(--size-h2)]">{t.heading}</h2>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2">
            {team.map((p) => (
              <li key={p.id} data-record={`team:${p.id}`}>
                <span className="block aspect-[4/5] overflow-hidden">
                  <Picture src={p.image} alt={p.name || t.empty} caption={t.empty} className="h-full w-full object-cover" />
                </span>
                <p className="mt-3 font-display text-[22px] leading-none">{p.name || "—"}</p>
                <p className="mt-1 text-sm text-ink-soft">{p.role || t.empty}</p>
                {p.bio && <p className="mt-2 max-w-[42ch] text-sm">{p.bio}</p>}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-20 lg:grid lg:grid-cols-[120px_1fr] lg:gap-8">
        <p className="label mb-2 text-ink-soft lg:mb-0 lg:pt-2">{v.label}</p>
        <div>
          <h2 className="text-[length:var(--size-h2)]">{v.heading}</h2>
          <ul className="mt-6 border-t border-line">
            {voices.map((q) => (
              <li key={q.id} data-record={`voices:${q.id}`} className="flex items-start gap-4 border-b border-line py-5">
                <Icon name="quote" size={18} className="mt-1 text-ink-soft" />
                <span>
                  <span className="block max-w-[56ch] text-lg">{q.quote || v.empty}</span>
                  {(q.who || q.where) && (
                    <span className="mt-2 block text-sm text-ink-soft">
                      {q.who}
                      {q.who && q.where ? " · " : ""}
                      {q.where}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
