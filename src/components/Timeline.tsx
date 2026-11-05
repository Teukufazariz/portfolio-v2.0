"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { jakartaNow } from "@/data/portfolio";

export type TimelineLane = { kind: "lane"; title: string; role: string; start: number; end: number };
export type TimelineBar = {
  kind: "bar";
  slug: string;
  title: string;
  tagline: string;
  when: string;
  platform: string;
  role: string;
  context: string;
  image?: string;
  imageAlt: string;
  appStoreUrl?: string;
  start: number;
  end: number;
};

const LETTERS = "JFMAMJJASOND";

/** Tells the grain behind the page (src/components/Grain.tsx) which screenshot to form, or none. */
const grain = (src?: string) => dispatchEvent(new CustomEvent("grain", { detail: src ?? null }));

export const Chevron = () => (
  <svg className="chev" viewBox="0 0 8 14" aria-hidden="true">
    <path d="M1.5 1.5 6.5 7 1.5 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

interface TimelineProps {
  rows: (TimelineLane | TimelineBar)[];
  /** Year and month (1–12) that the rows' start and end count from */
  startYear: number;
  startMonth: number;
  /** Slug shown in the detail panel before anything is hovered */
  initial: string;
}

/**
 * Every project as a bar on a month grid, one row of January to December per year, newest year on top,
 * grouped under the place it was made, with a red line for today. A new year adds a row, so months never narrow.
 * On phones the same links render as a plain list.
 */
export default function Timeline({ rows, startYear, startMonth, initial }: TimelineProps) {
  const bars = rows.filter((r): r is TimelineBar => r.kind === "bar");
  // The bar whose project fills the panel gets an ink outline; red is only for the bar under the pointer or focus.
  const [selected, setSelected] = useState<string | null>(null);
  const [now, setNow] = useState<{ year: number; month: number; x: number } | null>(null);
  const [fit, setFit] = useState<Record<string, string>>({});
  const wrap = useRef<HTMLDivElement>(null);
  const shown = bars.find((b) => b.slug === (selected ?? initial)) ?? bars[0];

  // Newest at the top, on the grid and in the phone list alike: lanes in reverse, each lane's title first,
  // then its projects in reverse. Time still runs left to right, so the bars climb toward "Now".
  const groups: (TimelineLane | TimelineBar)[][] = [];
  rows.forEach((r) => (r.kind === "lane" ? groups.push([r]) : groups.at(-1)?.push(r)));
  const listed = groups.reverse().flatMap(([lane, ...projects]) => [lane, ...projects.reverse()]);

  // Rows count months from startYear/startMonth; a year's January is at index y * 12 - base.
  const base = startYear * 12 + startMonth - 1;
  const lastYear = Math.floor((base + Math.max(...rows.map((r) => r.end))) / 12);
  const years: number[] = [];
  for (let y = Math.max(lastYear, now?.year ?? 0); y >= startYear; y--) years.push(y);

  // "Now" depends on the visitor's clock, so it is placed after hydration, never at build time.
  // A year with no projects yet still gets its row, so the line always has somewhere to go.
  useEffect(() => {
    const t = jakartaNow();
    const days = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    const month = t.getUTCMonth();
    setNow({ year: t.getUTCFullYear(), month, x: (month + (t.getUTCDate() - 1) / days) / 12 });
  }, []);

  // Every label sits outside its bar, on the left, so none crosses the Now line.
  // A bar that starts too near the grid's left edge (the first months) gets its label on the right instead.
  // ponytail: keyed by slug, so a project split across two years puts both labels on the same side.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const next: Record<string, string> = {};
      const start = el.getBoundingClientRect().left;
      el.querySelectorAll<HTMLAnchorElement>(".bar").forEach((bar) => {
        const label = bar.querySelector<HTMLElement>(".lbl");
        if (!label || !bar.dataset.slug) return;
        const left = bar.getBoundingClientRect().left - start;
        next[bar.dataset.slug] = left > label.scrollWidth + 20 ? "out left" : "out";
      });
      setFit(next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="work-heading" data-shape="1">
      <h2 className="sr-only" id="work-heading">Work</h2>
      {/* One mouseleave for all the years, so moving between two years' bars keeps the picture in the grain */}
      <div ref={wrap} onMouseLeave={() => grain()}>
        {years.map((y) => {
          const jan = y * 12 - base;
          // A span that crosses New Year shows in both years, cut at the edge of each.
          const inYear = listed.filter((r) => r.start <= jan + 11 && r.end >= jan);
          return (
            <div className="tl" key={y}>
              <div className="months" aria-hidden="true">
                {LETTERS.split("").map((letter, m) => (
                  <span key={m} className={now?.year === y && now.month === m ? "cur" : undefined}>
                    <b>{m === 0 ? y : " "}</b>
                    {letter}
                  </span>
                ))}
              </div>

              <ol className="rows">
                {inYear.map((r, i) => {
                  const columns = `${Math.max(r.start - jan, 0) + 1} / ${Math.min(r.end - jan, 11) + 2}`;
                  const style = { gridColumn: columns, gridRow: i + 1, "--r": i } as React.CSSProperties;
                  if (r.kind === "lane") {
                    return (
                      <li key={r.title} className="lane" style={style}>
                        <b>{r.title}</b>, {r.role}
                      </li>
                    );
                  }
                  return (
                    <li key={r.slug} style={style}>
                      <Link
                        href={`/projects/${r.slug}`}
                        scroll={false}
                        className={`bar ${fit[r.slug] ?? "out left"}`}
                        data-slug={r.slug}
                        data-shown={shown.slug === r.slug || undefined}
                        style={{ "--r": i } as React.CSSProperties}
                        onMouseEnter={() => {
                          setSelected(r.slug);
                          grain(r.image);
                        }}
                        onFocus={() => {
                          setSelected(r.slug);
                          grain(r.image);
                        }}
                        onBlur={() => grain()}
                      >
                        <span className="m-when">{r.when}</span>
                        {/* The tag rides with the label, so a bar that ends in December doesn't push it off the grid */}
                        <span className="lbl">
                          {r.title}
                          {r.appStoreUrl && <span className="tag">On the App Store</span>}
                        </span>
                        <span className="m-desc">{r.tagline}</span>
                        <Chevron />
                      </Link>
                    </li>
                  );
                })}
              </ol>

              {now?.year === y && (
                <div className="now" style={{ left: `${now.x * 100}%` }} aria-hidden="true">
                  <span>Now</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="detail grid">
        <div className="media">
          {shown.image && <Image src={shown.image} alt={shown.imageAlt} fill sizes="(max-width: 1024px) 33vw, 360px" />}
        </div>
        <div className="info">
          <p className="tab muted">{shown.when}</p>
          <p className="name">{shown.title}</p>
          <p>{shown.tagline}</p>
          <p className="muted">
            {shown.platform}. {shown.role}, {shown.context}.
          </p>
          <div className="actions">
            <Link className="btn" href={`/projects/${shown.slug}`} scroll={false}>
              Open case study
            </Link>
            {shown.appStoreUrl && (
              <a href={shown.appStoreUrl} target="_blank" rel="noopener noreferrer">
                Mac App Store
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
