"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// One driver for everything that moves with scroll or pointer. Pages are plain
// server-rendered HTML with data attributes; this reads them after each
// navigation and writes CSS variables. Nothing here creates content.
//
//   [data-reveal]            words (.w) resolve as the block scrolls into view
//   [data-develop]           an image develops as it enters
//   [data-scene]             tall section whose .pin is sticky; children with
//                            data-at="a,b" get --p over that slice of the scroll
//   [data-scrub="mmss|pct1|int"] data-from data-to   a number scrubbed by its scene
//   [data-kinetic]           letters (.ch) gain weight near the pointer
//   [data-print]             hovering or focusing shows that image by the cursor

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const span = (x: number, a: number, b: number) => clamp((x - a) / (b - a));
const FORMAT: Record<string, (v: number) => string> = {
  mmss: (v) => { const s = Math.round(v); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; },
  pct1: (v) => v.toFixed(1),
  int: (v) => String(Math.round(v)),
};
const at = (el: HTMLElement): [number, number] => {
  const [a, b] = (el.dataset.at ?? "0,1").split(",").map(Number);
  return [a, b];
};

// Sets a progress variable and marks the element .dev only while it is in between.
// CSS applies blur and opacity to .dev alone, so finished text and images carry no filter.
function setProgress(el: HTMLElement, prop: string, v: number) {
  const done = v >= 0.999;
  el.style.setProperty(prop, done ? "1" : v.toFixed(3));
  el.classList.toggle("dev", !done);
}

function setWords(words: HTMLElement[], p: number) {
  const n = words.length, overlap = Math.max(3, n * 0.2);
  for (let i = 0; i < n; i++) setProgress(words[i], "--p", clamp((p * (n + overlap) - i) / overlap));
}

export default function Motion() {
  const path = usePathname();
  const printRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const q = <T extends HTMLElement = HTMLElement>(sel: string, from: ParentNode = document) => [...from.querySelectorAll<T>(sel)];

    // ----- the load sequence ends on any input, and plays once per session
    const endIntro = () => {
      root.classList.add("skip-intro");
      try { sessionStorage.setItem("intro", "1"); } catch {}
    };
    const introTimer = setTimeout(endIntro, 1700);
    const introEvents = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    introEvents.forEach((ev) => addEventListener(ev, endIntro, { once: true, passive: true }));

    // ----- where am I: mark the nav link for the section in view
    const navLinks = q<HTMLAnchorElement>(".bar-nav a");
    const mark = (id: string | null) => navLinks.forEach((a) => {
      if (a.hash && id && a.hash === `#${id}`) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    const sectionWatch = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = e.target.id; // the work scenes have no id of their own
        mark(!id || id === "earlier" ? "work" : id);
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    q('main > [id], main > [aria-labelledby^="w-"]').forEach((s) => sectionWatch.observe(s));
    mark(location.pathname.startsWith("/work") ? "work" : null);

    if (reduce) {
      // Everything is already in its finished state in the HTML, so there is nothing to drive.
      return () => {
        clearTimeout(introTimer);
        introEvents.forEach((ev) => removeEventListener(ev, endIntro));
        sectionWatch.disconnect();
      };
    }

    // ----- scan the page
    const scenes = q("[data-scene]").map((el) => {
      const pin = el.querySelector<HTMLElement>(".pin");
      return {
        el, pinned: !!pin && getComputedStyle(pin).position === "sticky", s: 0, last: -1,
        parts: q("[data-at]:not([data-scrub])", el).map((part) => ({ el: part, range: at(part), words: q(".w", part), last: -1 })),
        scrubs: q("[data-scrub]", el).map((n) => ({ el: n, range: at(n), from: Number(n.dataset.from), to: Number(n.dataset.to), fmt: FORMAT[n.dataset.scrub ?? "int"], text: "" })),
      };
    });
    const inPinned = (el: Element) => scenes.some((sc) => sc.pinned && sc.el.contains(el));
    // Blocks outside a pinned scene (and every block on phones) follow their own position.
    const reveals = q("[data-reveal]").filter((el) => !inPinned(el)).map((el) => ({ el, words: q(".w", el), p: 0, last: -1 }));
    // Unpinned, the tool names stay whole (their dimming only means something while pinned); only "one page" develops.
    const develops = q("[data-develop], .cols > [data-at], .sources > .one").filter((el) => !inPinned(el)).map((el) => ({ el, d: 0, last: -1, prop: el.hasAttribute("data-develop") ? "--d" : "--p" }));
    const kinetics = fine ? q("[data-kinetic]").map((el) => ({ el, letters: q(".ch", el).map((c) => ({ el: c, w: 0, v: 0 })) })) : [];

    // ----- pointer and the print that trails it
    const print = printRef.current!;
    const pimg = print.querySelector("img")!, pcap = print.querySelector("figcaption")!;
    const pr = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, o: 0, to: 0, host: null as Element | null };
    const ptr = { x: -9999, y: -9999, moved: 0 };
    const place = (x: number, y: number) => {
      const hw = print.offsetWidth / 2, hh = print.offsetHeight / 2;
      pr.tx = Math.min(innerWidth - hw - 20, Math.max(hw + 20, x + 28 + hw));
      pr.ty = Math.min(innerHeight - hh - 20, Math.max(hh + 20, y + 34 + hh));
    };
    const show = (host: HTMLElement, x: number, y: number) => {
      if (pr.host === host) return;
      pr.host = host;
      pimg.src = host.dataset.print!;
      pcap.textContent = host.dataset.printCaption ?? "";
      place(x, y);
      if (pr.o < 0.05) { pr.x = pr.tx; pr.y = pr.ty; pr.vx = pr.vy = 0; }
      pr.to = 1;
    };
    const hide = () => { pr.host = null; pr.to = 0; };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.moved = performance.now();
      if (pr.host) place(e.clientX, e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const host = (e.target as Element).closest<HTMLElement>("[data-print]");
      if (host && e.pointerType === "mouse") show(host, e.clientX, e.clientY); else if (!host && pr.host) hide();
    };
    const onFocus = (e: FocusEvent) => {
      const host = (e.target as Element).closest<HTMLElement>("[data-print]");
      if (!host || !(e.target as Element).matches(":focus-visible")) return;
      const r = (e.target as Element).getBoundingClientRect();
      show(host, r.left, r.bottom);
    };
    const onLeave = () => { ptr.x = ptr.y = -9999; hide(); };
    let idle: ReturnType<typeof setTimeout> | undefined;
    let near: IntersectionObserver | undefined;
    if (fine) {
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("focusin", onFocus);
      document.addEventListener("focusout", hide);
      root.addEventListener("pointerleave", onLeave);
      // Each print preloads once its host is within a screen of view, so only the ones a reader can reach are fetched.
      idle = setTimeout(() => {
        near = new IntersectionObserver((entries) => entries.forEach((e) => {
          if (!e.isIntersecting) return;
          near!.unobserve(e.target);
          new Image().src = (e.target as HTMLElement).dataset.print!;
        }), { rootMargin: "100% 0px" });
        q("[data-print]").forEach((h) => near!.observe(h));
      }, 1200);
    }

    // ----- one loop
    let raf = 0, last = performance.now(), wake = last + 800;
    const onScroll = () => { wake = performance.now() + 500; };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.hidden) return;
      const vh = innerHeight;
      const follow = 1 - Math.exp(-dt * 14); // smooths stepped wheel input without lag
      let moving = false;

      if (now < wake) {
        for (const sc of scenes) {
          if (!sc.pinned) continue;
          const r = sc.el.getBoundingClientRect();
          if (r.bottom < -vh || r.top > vh * 2) continue;
          const raw = clamp(-r.top / Math.max(1, r.height - vh));
          sc.s += (raw - sc.s) * follow;
          if (Math.abs(raw - sc.s) > 0.0004) moving = true; else sc.s = raw;
          if (Math.abs(sc.s - sc.last) < 0.0005) continue;
          sc.last = sc.s;
          sc.el.style.setProperty("--s", sc.s.toFixed(4));
          for (const part of sc.parts) {
            const p = span(sc.s, part.range[0], part.range[1]);
            if (p === part.last) continue;
            part.last = p;
            if (part.words.length) setWords(part.words, p); else setProgress(part.el, part.el.hasAttribute("data-develop") ? "--d" : "--p", p);
          }
          for (const sb of sc.scrubs) {
            const text = sb.fmt(sb.from + (sb.to - sb.from) * span(sc.s, sb.range[0], sb.range[1]));
            if (text !== sb.text) sb.el.textContent = sb.text = text;
          }
        }
        for (const rv of reveals) {
          const r = rv.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const raw = span(vh * 0.92 - r.top, 0, r.height + vh * 0.42);
          rv.p += (raw - rv.p) * follow;
          if (Math.abs(raw - rv.p) > 0.0004) moving = true; else rv.p = raw;
          if (Math.abs(rv.p - rv.last) < 0.0005) continue;
          rv.last = rv.p;
          setWords(rv.words, rv.p);
        }
        for (const dv of develops) {
          const r = dv.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const raw = span(vh * 0.98 - r.top, 0, vh * 0.5);
          dv.d += (raw - dv.d) * follow;
          if (Math.abs(raw - dv.d) > 0.0004) moving = true; else dv.d = raw;
          if (Math.abs(dv.d - dv.last) < 0.0005) continue;
          dv.last = dv.d;
          setProgress(dv.el, dv.prop, dv.d);
        }
      }

      // Letters: a critically damped spring per letter, so a reversal carries its velocity.
      if (kinetics.length && (now - ptr.moved < 900 || now < wake)) {
        const sigma = innerWidth * 0.1;
        for (const k of kinetics) {
          const box = k.el.getBoundingClientRect();
          if (box.bottom < 0 || box.top > vh) continue;
          for (const L of k.letters) {
            const r = L.el.getBoundingClientRect();
            const dx = r.left + r.width / 2 - ptr.x, dy = r.top + r.height / 2 - ptr.y;
            const target = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
            L.v += ((target - L.w) * 210 - L.v * 29) * dt;
            L.w += L.v * dt;
            if (Math.abs(target - L.w) > 0.002 || Math.abs(L.v) > 0.01) moving = true;
            L.el.style.setProperty("--wght", (100 + 330 * L.w).toFixed(1));
          }
        }
      }

      // The print: x and y on their own springs (response about 0.4 s, no overshoot), tilt from velocity.
      if (pr.o > 0.002 || pr.to > 0) {
        pr.vx += ((pr.tx - pr.x) * 247 - pr.vx * 31.4) * dt; pr.x += pr.vx * dt;
        pr.vy += ((pr.ty - pr.y) * 247 - pr.vy * 31.4) * dt; pr.y += pr.vy * dt;
        pr.o += (pr.to - pr.o) * (1 - Math.exp(-dt * (pr.to ? 12 : 18))); // leaves faster than it arrives
        const tilt = Math.max(-6, Math.min(6, pr.vx * 0.011));
        print.style.opacity = pr.o.toFixed(3);
        print.style.transform = `translate(${pr.x.toFixed(1)}px, ${pr.y.toFixed(1)}px) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg) scale(${(0.96 + 0.04 * pr.o).toFixed(3)})`;
        moving = true;
      }

      if (moving) wake = Math.max(wake, now + 120);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(introTimer);
      introEvents.forEach((ev) => removeEventListener(ev, endIntro));
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", hide);
      root.removeEventListener("pointerleave", onLeave);
      clearTimeout(idle);
      near?.disconnect();
      sectionWatch.disconnect();
      print.style.opacity = "0";
    };
  }, [path]);

  return (
    <figure className="print" ref={printRef} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- one element whose src swaps on hover */}
      <img alt="" />
      <figcaption className="label" />
    </figure>
  );
}
