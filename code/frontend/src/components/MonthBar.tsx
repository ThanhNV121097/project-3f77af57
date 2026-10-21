import { useContent } from "../editable";

/**
 * The device that runs through the whole guide: twelve cells, one per month,
 * the ones we would stay away in filled solid. It appears on the home page,
 * on every row of the index and at the top of every destination page.
 *
 * On entry the filled cells come in left to right, 24ms apart — the page
 * saying "these are the bad months" rather than decorating. Reduced motion
 * draws the end state (theme.css flattens the duration).
 */
export default function MonthBar({ avoid, size = "sm", label }: { avoid: number[]; size?: "sm" | "lg"; label?: string }) {
  const months = useContent<string[]>("months.short");
  const cell = size === "lg" ? "h-7 text-[11px]" : "h-4 text-[9px]";
  return (
    <div className="flex w-full gap-px" role="img" aria-label={label}>
      {months.map((m, i) => {
        const bad = avoid.includes(i + 1);
        return (
          <span
            key={i}
            style={{ animationDelay: bad ? `${i * 24}ms` : undefined }}
            className={[
              "figures flex flex-1 items-center justify-center leading-none",
              cell,
              bad ? "bg-accent text-accent-ink month-bad" : "bg-[var(--line)] text-ink-soft",
            ].join(" ")}
          >
            {size === "lg" ? m : ""}
          </span>
        );
      })}
    </div>
  );
}
