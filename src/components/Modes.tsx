"use client";

import { useEffect, useState } from "react";

/**
 * Light and Dark switches, standing on the frame's left edge as on p5aholic.me.
 * The theme follows the system until the visitor picks one. The choice is stored under "theme"
 * and applied before first paint by the script in src/app/layout.tsx.
 */
export default function Modes() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const root = document.documentElement;
      setDark(root.dataset.theme ? root.dataset.theme === "dark" : media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const pick = (theme: "light" | "dark") => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    setDark(theme === "dark");
  };

  return (
    <div className="modes" role="group" aria-label="Theme">
      <button type="button" aria-pressed={!dark} onClick={() => pick("light")}>Light</button>
      <button type="button" aria-pressed={dark} onClick={() => pick("dark")}>Dark</button>
    </div>
  );
}
