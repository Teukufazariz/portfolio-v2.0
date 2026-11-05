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
  /** Year and month (1–12) of the first column */
  startYear: number;
  startMonth: number;
  /** Number of month columns */
  months: number;
  /** Slug shown in the detail panel before anything is hovered */
  initial: string;
}

/**
 * Every project as a bar on one month grid, grouped under the place it was made,
 * with a red line for today. On phones the same links render as a plain list.
 */
export default function Timeline({ rows, startYear, startMonth, months, initial }: TimelineProps) {
  const bars = rows.filter((r): r is TimelineBar => r.kind === "bar");
  // The bar whose project fills the panel gets an ink outline; red is only for the bar under the pointer or focus.
  const [selected, setSelected] = useState<string | null>(null);
  const [now, setNow] = useState<{ x: number; month: number } | null>(null);
  const [fit, setFit] = useState<Record<string, string>>({});
  const wrap = useRef<HTMLDivElement>(null);
  const shown = bars.find((b) => b.slug === (selected ?? initial)) ?? bars[0];

  // Newest at the top, on the grid and in the phone list alike: lanes in reverse, each lane's title first,
  // then its projects in reverse. Time still runs left to right, so the bars climb toward "Now".
  const groups: (TimelineLane | TimelineBar)[][] = [];
  rows.forEach((r) => (r.kind === "lane" ? groups.push([r]) : groups.at(-1)?.push(r)));
  const listed = groups.reverse().flatMap(([lane, ...projects]) => [lane, ...projects.reverse()]);

  // "Now" depends on the visitor's clock, so it is placed after hydration, never at build time.
  useEffect(() => {
    const t = jakartaNow();
    const index = (t.getUTCFullYear() - startYear) * 12 + t.getUTCMonth() - (startMonth - 1);
    const days = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    const x = index + (t.getUTCDate() - 1) / days;
    if (x >= 0 && x < months) setNow({ x: x / months, month: index });
  }, [startYear, startMonth, months]);

  // Every label sits outside its bar, on the left, so none crosses the Now line.
  // A bar that starts too near the grid's left edge (the first months) gets its label on the right instead.
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
      <div className="tl" ref={wrap} style={{ "--n": months } as React.CSSProperties}>
        <div className="months" aria-hidden="true">
          {Array.from({ length: months }, (_, i) => {
            const m = (startMonth - 1 + i) % 12;
            const year = startYear + Math.floor((startMonth - 1 + i) / 12);
            return (
              <span key={i} className={now?.month === i ? "cur" : undefined}>
                <b>{i === 0 || m === 0 ? year : " "}</b>
                {LETTERS[m]}
              </span>
            );
          })}
        </div>

        <ol className="rows" onMouseLeave={() => grain()}>
          {listed.map((r, i) => {
            const style = { gridColumn: `${r.start + 1} / ${r.end + 2}`, gridRow: i + 1, "--r": i } as React.CSSProperties;
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
                  <span className="lbl">{r.title}</span>
                  {r.appStoreUrl && <span className="tag">On the App Store</span>}
                  <span className="m-desc">{r.tagline}</span>
                  <Chevron />
                </Link>
              </li>
            );
          })}
        </ol>

        {Array.from({ length: months }, (_, i) => i)
          .filter((i) => i > 0 && (startMonth - 1 + i) % 12 === 0)
          .map((i) => (
            <div key={i} className="yearline" style={{ left: `${(i / months) * 100}%` }} aria-hidden="true" />
          ))}
        {now && (
          <div className="now" style={{ left: `${now.x * 100}%` }} aria-hidden="true">
            <span>Now</span>
          </div>
        )}
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
