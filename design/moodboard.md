# Đi Ngược — moodboard

A guide to fourteen places in Vietnam, written by two people who went to all of them.
It sells nothing. Its one product is judgement, and the half of that judgement nobody
else publishes is the warning: the month the rain closes Mã Pì Lèng, the fortnight the
old town in Hội An goes under, the week every berth in Hạ Long is taken.

The owner chose the direction **"Tell them when not to come"** after seeing it drawn.
Its palette, faces, scale and first screen are fixed by that choice and are not
re-opened here.

---

## Looked at

| Site | Built with (as reported) | What I take |
|---|---|---|
| **land-book.com** (gallery) | plain JS, Inter, 2 sticky elements, 26 running animations on load | The index density: a long list of real things, each row the same height, scanned rather than read. The filter rail that narrows a long list without a page change. |
| **awwwards.com/websites** (gallery) | plain JS, Inter Tight, no GSAP | The card band at the top of the page — several pictures in one row, one treatment, no gaps between them — and the small-caps metadata line under each. |
| **linear.app** | Inter Variable + Berkeley Mono, ~105 CSS/WAAPI animations, no scroll library, no sticky | The reveal timing: everything rises a short distance and fades, nothing scrubs; the monospace-figure treatment for anything numeric; section headings that sit small above very plain content. |
| **are.na** | Next.js, one face ("areal"), no GSAP, no pinning | Type-first screens with almost no chrome: a page can be a list and a rule and nothing else. Labels carry the structure; borders are hairlines, not boxes. |
| **neutomni.com** | GSAP + ScrollTrigger + Lenis + SplitText, 7 sticky elements, 23 500px page | Studied for its load moment and its easing only. Its scroll-jacking (Lenis, seven pins, a page six screens too long) is exactly what this guide must not do — a reader with twelve days and no plan cannot be made to scroll through a show. Taken: the short staggered entrance on the first screen. Left: everything else. |

Structure, rhythm, timing and technique only. No reference's palette, type pairing or
arrangement is reproduced — three of the five are set in Inter on white or near-black,
and this site is jade green with a yellow warning block.

---

## The direction

**Palette (dark, saturated).** Ground `#15514A`, a flat jade that is neither sea nor
forest and is nobody's default dark mode; surface `#0F3F3A` a step deeper for the
chart rows; ink `#F3F0E4` warm off-white; ink-soft `#A9C0B8`; accent `#F0C04B`, a
signal yellow used for one thing only — the months to stay away. Photographs of
Vietnam are overwhelmingly green, blue and gold; set on jade they read as the same
country rather than fourteen postcards from fourteen stock libraries.

**Faces.** The chosen display face is a **sans**, not a serif or an italic display face:
house style holds. Display **Bricolage Grotesque 500** (Google Fonts, OFL) — graphic, slightly
irregular, reads as a printed notice rather than a brochure, and carries diacritics
(Hạ, Mộc, Nhơn) without breaking. Body **Inter**. Figures everywhere are tabular:
distances, hours, days and the month grid all line up in columns.

**Scale at 1440.** h1 56px / −0.03em; h2 36px; row name 22px; month cell 10px.
Mid scale on purpose — the first screen has to carry a photo band, a headline AND the
first warning rows, so the headline takes less than the house ceiling and the space
goes to the rows.

**Grid.** One main edge, the left. Everything hangs off it: eyebrow, headline,
paragraph, button, row name. The right-hand side of every destination row is a
right-aligned figure column (days, kilometres, hours) so digits stack. The photo band
and the month charts run past the page container to the viewport edges.

**Pictures.** One per destination, fourteen in all, every one a real photograph of that
place. One treatment throughout: 4:3, full-bleed inside its cell, no rounding, no
shadow, and a jade multiply veil so the whole band reads as one picture rather than a
collage.

**Motion.** A short load moment on the first screen: the four photographs wipe up in
sequence (80ms apart, 520ms each), then the headline, then the first row. Sections
fade and rise 16px over 600ms on entry. The month bars draw their avoid cells in on
entry, left to right, 24ms per cell — the one motion that carries meaning, because it
is the page saying *these* are the bad months. Hover: a row's rule thickens and its
figures shift to yellow. Native scrolling, nothing pinned or scrubbed.
`prefers-reduced-motion` turns all of it off and draws the end state.

---

## COMMITMENTS

- The first screen opens with a band of four photographs edge to edge, touching each other and both edges of the window, with no container margin — not a hero picture in a box.
- The twelve-month bar — twelve cells, the months to stay away filled solid #F0C04B — appears on the home page, on every row of the index and at the top of every destination page.
- Yellow is only ever a warning: no button, no link and no heading uses the accent; the only yellow on the site is an avoid month, an avoid line or the icon beside one.
- The index of all fourteen is a hairline-ruled table, one rule per row, with the figure column (days, hours, km) right-aligned so the digits line up — not a grid of cards.
- Filtering the index shows a running total in days for the current filter ("3 places · 10 days").
- Every destination page leads with its photograph full-bleed to both edges at 56vh, with the place's name and region overlaid at the bottom left.
- The avoid line sits above the fold on every destination page, in yellow, before anything good is said about the place.
- Section headings are small-caps labels in the left margin at 1180px and wider, beside their text rather than above it.
