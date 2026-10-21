import { useEffect } from "react";
import { useContent } from "./editable";

/**
 * Each page's title and description, for search results and for the card a
 * link shows when it is shared (Facebook, Zalo). index.html carries the
 * home page's; every other page calls this with its own content keys:
 *
 *   usePageMeta("pages.menu.title", "pages.menu.description");
 */
export function usePageMeta(titleKey: string, descriptionKey?: string) {
  const title = useContent(titleKey);
  const description = useContent(descriptionKey ?? "site.description");
  const name = useContent("site.name");
  useEffect(() => {
    const full = title && title !== name ? `${title} — ${name}` : name;
    if (full) document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
  }, [title, description, name]);
}

/**
 * The same, for a page whose title is a record rather than a content key —
 * a destination's own name. Pass empty strings while the record is loading
 * and the page keeps the site's own title.
 */
export function useRecordMeta(title: string, description: string) {
  const name = useContent("site.name");
  const fallback = useContent("site.description");
  useEffect(() => {
    const full = title ? `${title} — ${name}` : name;
    if (full) document.title = full;
    const d = description || fallback;
    setMeta("name", "description", d);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", d);
  }, [title, description, name, fallback]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}
