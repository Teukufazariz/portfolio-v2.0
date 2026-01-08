"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 md:top-10 md:right-10 z-50 w-12 h-12 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center text-xl hover:scale-110 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}