"use client";

import { useEffect, useRef, useState } from "react";
import { jakartaNow } from "@/data/portfolio";

// 60 minute marks, every fifth one a thick hour bar.
const MARKS = Array.from({ length: 60 }, (_, i) => {
  const big = i % 5 === 0;
  const w = big ? 3.4 : 1.6;
  return (
    <rect key={i} x={50 - w / 2} y={2} width={w} height={big ? 11 : 3.6} transform={`rotate(${i * 6} 50 50)`} />
  );
});

/** The tab icon is the same clock, without the second hand, redrawn every minute. */
function favicon(h: number, m: number) {
  let link = document.querySelector<HTMLLinkElement>("link[data-clock]");
  if (!link) {
    link = Object.assign(document.createElement("link"), { rel: "icon", type: "image/svg+xml" });
    link.dataset.clock = "";
    document.head.append(link); // last icon in <head> wins
  }
  const hand = (deg: number, length: number, width: number) =>
    `<rect x="${50 - width / 2}" y="${50 - length}" width="${width}" height="${length + 8}" transform="rotate(${deg} 50 50)"/>`;
  link.href =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="49" fill="#fff"/><g fill="#000">${hand((h % 12) * 30 + m * 0.5, 26, 10)}${hand(m * 6, 40, 7)}</g><circle cx="50" cy="50" r="5" fill="#e30000"/></svg>`,
    );
}

/**
 * Station clock on Jakarta time. The second hand sweeps round in 58.5 s and rests at 12,
 * then the minute hand jumps. Clicking pauses it (WCAG 2.2.2: moving content can be stopped).
 */
export default function Clock() {
  const hour = useRef<SVGRectElement>(null);
  const minute = useRef<SVGRectElement>(null);
  const second = useRef<SVGGElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0, iconMinute = -1;
    const tick = () => {
      const t = jakartaNow();
      const h = t.getUTCHours(), m = t.getUTCMinutes();
      if (m !== iconMinute) favicon(h, (iconMinute = m));
      const s = t.getUTCSeconds() + t.getUTCMilliseconds() / 1000;
      hour.current?.setAttribute("transform", `rotate(${(h % 12) * 30 + m * 0.5} 50 50)`);
      minute.current?.setAttribute("transform", `rotate(${m * 6} 50 50)`);
      second.current?.setAttribute("transform", `rotate(${Math.min(s / 58.5, 1) * 360} 50 50)`);
      if (time.current) time.current.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      id = still ? window.setTimeout(tick, 1000) : requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(id);
    };
  }, [paused]);

  return (
    <button className="clockbox" type="button" title="Pause or resume the clock" onClick={() => setPaused((p) => !p)}>
      <span className="sr-only">{paused ? "Resume clock. " : "Pause clock. "}</span>
      <svg className="clock" viewBox="0 0 100 100" aria-hidden="true">
        <g>{MARKS}</g>
        <rect ref={hour} x="47.1" y="23" width="5.8" height="35" />
        <rect ref={minute} x="47.8" y="9" width="4.4" height="49" />
        <g ref={second} className="sec">
          <rect x="49.25" y="15" width="1.5" height="49" />
          <circle cx="50" cy="50" r="2.6" />
        </g>
      </svg>
      <span>
        <span className="tab" ref={time}>--:--</span> in Jakarta
        <br />
        <span className="muted">{paused ? "Paused" : "UTC+7"}</span>
      </span>
    </button>
  );
}
