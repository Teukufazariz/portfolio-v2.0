"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";
import { site } from "@/content";

// The fixed frame: name, the four links a recruiter needs, and the theme switch.
export default function Chrome() {
  // Dev only: Strict Mode's remount clears attributes the head script set. No-op in production.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) document.documentElement.dataset.theme = saved;
    } catch {}
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
    };
    // One cross-fade of the whole page, so colours don't change element by element.
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still && "startViewTransition" in document) document.startViewTransition(apply);
    else apply();
  }

  return (
    <>
      <div className="edge" aria-hidden="true" />
      <header className="bar">
        <Link className="label" href="/">{site.name}</Link>
        <nav className="bar-nav label" aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <a href={site.cv}>CV</a>
          <Link href="/#contact">Contact</Link>
        </nav>
        <button className="bar-theme" type="button" onClick={toggle} aria-label="Switch between dark and light theme">
          <span data-t="dark">Dark</span> / <span data-t="light">Light</span>
        </button>
      </header>
    </>
  );
}
