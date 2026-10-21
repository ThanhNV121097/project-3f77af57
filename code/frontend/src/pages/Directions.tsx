import "./directions.css";

/**
 * Three directions for Đi Ngược, one full first screen each, at /directions-1
 * …-3. Not part of the site: rendered outside the app layout, no header, no
 * footer, desktop only. Deleted once the owner has chosen.
 *
 * Every month, distance, travel time and airport below is checked. Lines that
 * are a matter of opinion say so.
 */

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

type Row = {
  name: string;
  kind: string;
  best: string;
  days: string;
};

/* Fourteen destinations, north to south. */
const INDEX: Row[] = [
  { name: "Hà Giang", kind: "Mountains · North", best: "Sep–Nov", days: "4–5" },
  { name: "Sa Pa", kind: "Mountains · North", best: "Sep–Nov", days: "3" },
  { name: "Mộc Châu", kind: "Countryside · North", best: "Nov–Feb", days: "2" },
  { name: "Hạ Long", kind: "Coast · North", best: "Oct–Apr", days: "2" },
  { name: "Cát Bà", kind: "Islands · North", best: "Apr–Jun", days: "3" },
  { name: "Ninh Bình", kind: "Countryside · North", best: "May–Jun", days: "2" },
  { name: "Phong Nha", kind: "National park · Centre", best: "Feb–Aug", days: "3" },
  { name: "Huế", kind: "Heritage town · Centre", best: "Feb–Apr", days: "2" },
  { name: "Hội An", kind: "Heritage town · Centre", best: "Feb–May", days: "3" },
  { name: "Quy Nhơn", kind: "Coast · Centre", best: "Feb–Aug", days: "3" },
  { name: "Đà Lạt", kind: "Mountains · South", best: "Nov–Mar", days: "3" },
  { name: "Mũi Né", kind: "Coast · South", best: "Nov–Mar", days: "2" },
  { name: "Phú Quốc", kind: "Islands · South", best: "Nov–Mar", days: "4" },
  { name: "Côn Đảo", kind: "Islands · South", best: "Mar–Jun", days: "3" },
];

function Tag({ children }: { children: string }) {
  return <div className="dirtag">{children}</div>;
}

/* ---------------- 1. The whole country, one list ---------------- */

export function DirectionsOne() {
  return (
    <div className="d1">
      <div className="d1__main">
        <div className="rise">
          <p className="d1__kicker">Fourteen places · Nine years · All of them walked</p>
          <h1 className="d1__h1">Where to go next in Vietnam, and when not to.</h1>
          <p className="d1__sub">
            Two of us have been to every place on this list. Narrow it by region or by the
            kind of place, open one, and read what it is actually like.
          </p>
        </div>

        <div className="d1__head">
          <span>№</span>
          <span>Place</span>
          <span>Region and kind</span>
          <span>Best months</span>
          <span>Days</span>
        </div>

        {INDEX.map((r, i) => (
          <div className="d1__row" key={r.name}>
            <span className="d1__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="d1__name">{r.name}</span>
            <span className="d1__kind">{r.kind}</span>
            <span className="d1__go">{r.best}</span>
            <span className="d1__days">{r.days}</span>
          </div>
        ))}

        <div className="d1__foot">
          <span><b>Twelve days and you like mountains?</b> Hà Giang, Sa Pa, Mộc Châu — 10 days with the roads.</span>
          <span>The monthly letter · xinchao@dinguoc.vn</span>
        </div>
      </div>

      <div className="d1__plate">
        <img src="/images/sa-pa.jpg" alt="Terraced rice fields under cloud above Sa Pa" />
        <p className="d1__cap">
          Sa Pa, late September. 315 km from Hà Nội, five hours by bus on the Nội Bài–Lào Cai
          expressway.
        </p>
      </div>

      <Tag>Direction 1 · The whole country, one list</Tag>
    </div>
  );
}

/* ---------------- 2. Stand on the pass first ---------------- */

const PASS_FACTS = [
  { label: "Best months", value: "Sep – Nov" },
  { label: "From", value: "Hà Nội, 300 km" },
  { label: "By road", value: "6–7 hours" },
  { label: "Worth staying", value: "4–5 days" },
];

export function DirectionsTwo() {
  return (
    <div className="d2">
      <div className="d2__bg">
        <img src="/images/ha-giang.jpg" alt="Terraced valley on the Hà Giang loop in the ripe-rice season" />
      </div>
      <div className="d2__scrim" />

      <div className="d2__body">
        <div className="d2__kicker rise">
          <span>Đi Ngược</span>
          <span>Mountains · North</span>
          <b>01 / 14</b>
        </div>

        <div className="rise">
          <h1 className="d2__h1">Hà Giang</h1>
          <p className="d2__lede">
            The loop runs 350 km through the Đồng Văn karst plateau, over the Mã Pí Lèng pass
            above the Nho Quế river. It is the most dramatic road in the country.
          </p>
          <p className="d2__op">
            Our opinion: do it in four days, not two. Three hundred and fifty kilometres of
            hairpins is not a weekend, and the villages are the point.
          </p>
          <a className="d2__link" href="#next">Read the guide</a>
        </div>
      </div>

      <aside className="d2__rail">
        {PASS_FACTS.map((f) => (
          <div className="d2__fact" key={f.label}>
            <span>{f.label}</span>
            <strong>{f.value}</strong>
          </div>
        ))}
        <div className="d2__fact d2__fact--warn">
          <span>Do not come</span>
          <strong>Jun – Aug</strong>
        </div>
      </aside>

      <Tag>Direction 2 · Stand on the pass first</Tag>
    </div>
  );
}

/* ---------------- 3. Tell them when not to come ---------------- */

type Warn = { name: string; kind: string; bad: number[]; why: string };

const WARN: Warn[] = [
  {
    name: "Hà Giang",
    kind: "Mountains · North",
    bad: [5, 6, 7],
    why: "Summer rain brings landslides; sections of the Mã Pí Lèng pass close without notice.",
  },
  {
    name: "Hạ Long",
    kind: "Coast · North",
    bad: [5, 6, 7, 8],
    why: "Typhoon season. Sailings are suspended for days at a time, and the bay is grey when they are not.",
  },
  {
    name: "Hội An",
    kind: "Heritage town · Centre",
    bad: [9, 10, 11],
    why: "The Thu Bồn floods the old town most years — the lanes along Bạch Đằng go under.",
  },
  {
    name: "Phú Quốc",
    kind: "Islands · South",
    bad: [6, 7, 8, 9],
    why: "The southwest monsoon. Long Beach collects what the sea throws up, and the boats stop.",
  },
];

export function DirectionsThree() {
  const strip = [
    { src: "/images/ha-long.jpg", alt: "Limestone towers in Hạ Long Bay", cap: "Hạ Long", pos: "64% 52%" },
    { src: "/images/ninh-binh.jpg", alt: "Ripe rice between karst hills at Tam Cốc", cap: "Ninh Bình", pos: "50% 64%" },
    { src: "/images/hoi-an.jpg", alt: "Lantern-lit lane in the Hội An old town", cap: "Hội An", pos: "50% 38%" },
    { src: "/images/phu-quoc.jpg", alt: "Shoreline and sea on Phú Quốc", cap: "Phú Quốc", pos: "50% 42%" },
  ];

  return (
    <div className="d3">
      <div className="d3__strip">
        {strip.map((c) => (
          <figure className="d3__cell" key={c.src}>
            <img src={c.src} alt={c.alt} style={{ objectPosition: c.pos }} />
            <figcaption className="d3__cap">{c.cap}</figcaption>
          </figure>
        ))}
      </div>

      <div className="d3__body">
        <div className="rise">
          <p className="d3__kicker">Đi Ngược · The honest half</p>
          <h1 className="d3__h1">Every place has a month it is wrong.</h1>
          <p className="d3__sub">
            Fourteen destinations, and for each one the weeks we would tell a friend to skip.
            Yellow is stay away.
          </p>
        </div>

        <div className="d3__rows">
          {WARN.map((w) => (
            <div className="d3__row" key={w.name}>
              <div className="d3__place">
                {w.name}
                <em>{w.kind}</em>
              </div>
              <div className="d3__bar" aria-label={`Months to avoid in ${w.name}`}>
                {MONTHS.map((m, i) => (
                  <span
                    key={i}
                    className={`d3__m${w.bad.includes(i) ? " d3__m--bad" : ""}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="d3__why">{w.why}</p>
            </div>
          ))}
        </div>

        <div className="d3__foot">
          <span><b>Ten more places</b> on the same chart</span>
          <span>27 Nhà Chung, Hoàn Kiếm, Hà Nội · Mon–Fri 9:00–18:00</span>
          <span>xinchao@dinguoc.vn</span>
        </div>
      </div>

      <Tag>Direction 3 · Tell them when not to come</Tag>
    </div>
  );
}
