"use client";

import { useEffect, useState } from "react";

/** Follows the system theme until the visitor picks one; the choice is stored under "theme". */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const chosen = document.documentElement.dataset.theme;
      setDark(chosen ? chosen === "dark" : media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <button className="toggle" type="button" aria-pressed={dark} onClick={toggle}>
      Dark mode
    </button>
  );
}
