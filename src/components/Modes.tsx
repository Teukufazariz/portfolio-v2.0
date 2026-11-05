"use client";

import { useEffect, useState } from "react";

type Theme = "auto" | "light" | "dark";
const THEMES: [Theme, string][] = [
  ["auto", "Auto"],
  ["light", "Light"],
  ["dark", "Dark"],
];

/**
 * Auto, Light or Dark under the clock, the current one in ink. Auto follows the system.
 * A pick is stored under "theme" and applied before first paint by the script in src/app/layout.tsx.
 * Native radios, so arrow keys and screen readers treat it like any one-of-three choice.
 */
export default function Modes() {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const pick = (t: Theme) => {
    const root = document.documentElement;
    if (t === "auto") delete root.dataset.theme;
    else root.dataset.theme = t;
    try {
      if (t === "auto") localStorage.removeItem("theme");
      else localStorage.setItem("theme", t);
    } catch {}
    setTheme(t);
  };

  return (
    <fieldset className="modes">
      <legend className="sr-only">Theme</legend>
      {THEMES.map(([t, label]) => (
        <label key={t}>
          <input className="sr-only" type="radio" name="theme" checked={theme === t} onChange={() => pick(t)} />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
