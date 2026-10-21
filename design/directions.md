# Đi Ngược — directions for the design

## The reading

Đi Ngược sells nothing. It has one product and it is judgement: fourteen places, and the
honest word on each — the month the pass closes, the week the old town floods, the fortnight
the beach belongs to everybody else. The person who arrives has already decided they are
going to Vietnam and has not decided where; they have a number of days and a preference
(mountains, sea, a town they can walk), and they are trying to turn those into an itinerary
before their attention runs out. They are not browsing for pleasure and they are not being
sold to, so the site earns its keep on trust and on speed: two people, nine years, every one
of these places walked, and the facts — months, kilometres, hours, airport — right. What it
is not: a booking engine, a tour brochure, an influencer's highlight reel. There is no cart,
no price and no "book now", and any screen that looks like it wants money from the visitor is
the wrong screen for this business.

Three readings of that follow, and all three hold. They differ on what the visitor needs
first: the list, the place, or the warning.

---

## The whole country, one list

- **Suits you if:** your reader turns up with twelve days booked and no plan, and the most
  useful thing you can do is put all fourteen in front of them at once — place, region, kind,
  best months, how many days — so they find their trip before they finish their coffee.
- **Palette (light):** ground `#F4F1EA` · surface `#FFFFFF` · ink `#16150F` · ink-soft `#6B675C` ·
  accent `#B4341F` · accent-ink `#FFFFFF` · line `rgba(22,21,15,0.14)`
- **Faces:** display **Space Grotesk** 500 (Google Fonts, OFL) — a grotesk with enough character
  to carry a name like Hà Giang at 19px and enough discipline to set a timetable; body **Inter**.
- **Scale at 1440:** h1 40px / −0.025em · place name 19px · index numeral 20px · figures 16px,
  tabular. Deliberately small: this screen has to carry fourteen rows, so the space goes to the
  rows and not to the headline.
- **First screen:** a full-height index of all fourteen on paper, one hairline rule per row, the
  days right-aligned so the digits line up — and a tall photograph holding the right third of
  the window, bleeding off the top, right and bottom edges.
- **The device:** the index numerals. 01–14 set large and pale in the left margin, with the
  hairline rule system hung off them; the numeral under the cursor turns brick red.
- **Unlock:** none. House style as written.

## Stand on the pass first

- **Suits you if:** your reader has to feel the place before they will read a fact about it, and
  the thing that makes them trust you is that your photograph is clearly taken from the road
  rather than bought from a brochure.
- **Palette (dark):** ground `#0C0D0B` · surface `#14160F` · ink `#EFEDE4` · ink-soft `#9C9B90` ·
  accent `#E0A33C` · accent-ink `#0C0D0B` · line `rgba(239,237,228,0.16)`
- **Faces:** display **Instrument Serif** 400 (Google Fonts, OFL); body **Inter**.
- **Scale at 1440:** h1 72px / −0.02em / leading 1.0 · supporting line 18px · rail labels 10px
  letterspaced · rail figures 15px tabular. One destination on the screen, so the headline takes
  the whole allowance.
- **First screen:** one photograph filling the window, the place named bottom-left at 72px over
  it, and the facts stacked up a hairline rail pinned to the right edge of the viewport.
- **The device:** that right-edge rail — five hairline-ruled rows (best, from, time, stay, avoid)
  running to the very edge of the window, with the avoid row in amber.
- **Unlock:** the display face is a serif, not a sans. This is a guide somebody wrote after
  going; Instrument Serif says writing, and Inter says software. Carried on every page —
  destination titles, section heads, the letter sign-up.

## Tell them when not to come

- **Suits you if:** what people actually repeat about you is the honest half — the month the
  rain closes the pass — and you would rather lead with the warning than with the postcard.
- **Palette (dark, saturated):** ground `#15514A` · surface `#0F3F3A` · ink `#F3F0E4` ·
  ink-soft `#A9C0B8` · accent `#F0C04B` · accent-ink `#15514A` · line `rgba(243,240,228,0.18)`
- **Faces:** display **Bricolage Grotesque** 500 (Google Fonts, OFL) — graphic, slightly odd,
  reads as a printed notice rather than a brochure; body **Inter**.
- **Scale at 1440:** h1 56px / −0.03em · row name 22px · month cells 10px, tabular. Mid scale:
  the headline shares the screen with four charts.
- **First screen:** a band of four photographs edge to edge across the top of the window, all on
  one treatment, and under it on flat jade the warning rows — each place with its twelve months
  drawn out and the bad ones blocked in yellow.
- **The device:** the twelve-month bar. J F M A M J J A S O N D, twelve cells, the months to
  stay away filled solid — one graphic that repeats on every destination in the guide.
- **Unlock:** none. House style as written; the colour does the work.

---

## Pictures

Six photographs, Pixabay Content Licence, credited in `credits.json`. Stand-ins until the owners'
own pictures arrive — they have been to all fourteen places and will have better ones.

| File | Used in | Ratio and crop |
|---|---|---|
| `sa-pa.jpg` | 1 | tall column ≈ 0.58:1, focal on the terrace steps (50% 46%) |
| `ha-giang.jpg` | 2 | full-bleed 16:9, focal on the valley floor (50% 44%), −38% brightness |
| `ha-long.jpg` | 3 | strip cell 4:3, focal right (64% 52%) |
| `ninh-binh.jpg` | 3 | strip cell 4:3, focal low (50% 64%) |
| `hoi-an-street.jpg` | 3 | strip cell 4:3 from a 3:2 file, focal centre (50% 50%) |
| `phu-quoc.jpg` | 3 | strip cell 4:3, focal on the horizon (50% 42%) |

No file is used twice, and no two directions crop any file the same way.

## Looked at

land-book.com (index density, hairline row rhythm) and are.na (type-first screens, numerals as
structure). Structure and rhythm only — neither palette, neither type pairing.

## Facts on these screens

Months, distances, travel times and airports are checked, not invented. Where a thing is a
matter of opinion — "the best five days in the country" — it is written as ours.
