import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import ContactForm from "../components/ContactForm";
import MapEmbed from "../components/MapEmbed";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

/**
 * Write to us. The owner's own details exactly as they gave them, the map of
 * the address, and the form — which reaches them in Agent Team.
 */
export default function Contact() {
  usePageMeta("contact.title", "contact.description");
  const phone = useContent<string>("contact.phone");
  const email = useContent<string>("contact.email");
  const address = useContent<string>("contact.address");
  const hours = useContent<string>("contact.hours");
  const labels = useContent<Record<string, string>>("contact.labels");

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-12">
      <T k="contact.eyebrow" as="p" className="label text-ink-soft" />
      <h1 className="mt-3 max-w-[16ch] text-[length:var(--size-h1)]">
        <T k="contact.headline" />
      </h1>
      <T k="contact.sub" as="p" className="mt-4 max-w-[52ch] text-ink-soft" />

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ContactForm fields={[{ key: "days", type: "number" }, { key: "month", type: "text" }]} />
        </div>

        <aside className="mt-12 lg:col-span-5 lg:mt-0">
          <T k="contact.detailsLabel" as="p" className="label text-ink-soft" />
          <dl className="mt-3 border-t border-line">
            <div className="flex items-center justify-between gap-4 border-b border-line py-3">
              <dt className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="phone" size={16} />
                {labels.phone}
              </dt>
              <dd className="figures text-right">
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-line py-3">
              <dt className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="mail" size={16} />
                {labels.email}
              </dt>
              <dd className="text-right">
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-line py-3">
              <dt className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="address" size={16} />
                {labels.address}
              </dt>
              <dd data-testid="contact-address" className="max-w-[22ch] text-right">
                {address}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-line py-3">
              <dt className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="hours" size={16} />
                {labels.hours}
              </dt>
              <dd className="figures text-right">{hours}</dd>
            </div>
          </dl>
          <Reveal className="mt-6">
            <MapEmbed className="h-72 w-full" />
            <T k="contact.mapLabel" as="p" className="mt-2 text-xs text-ink-soft" />
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
