"use client";

import { useEffect, useState } from "react";

/**
 * Manual light/dark theme switcher. Persists the choice to
 * localStorage ("theme") and sets a `data-theme` attribute on
 * <html>. Without a stored choice the site follows the OS via
 * `prefers-color-scheme` (the inline script in layout.tsx keeps
 * the first paint consistent).
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const stored = root.getAttribute("data-theme");
    const fromSystem = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(
      stored === "dark" || (!stored && fromSystem) ? "dark" : "light",
    );
  }, []);

  function toggle() {
    const next: "light" | "dark" = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.classList.add("theme-anim");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode etc. — the in-page theme still applies.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
      title={theme === "light" ? "Dark mode" : "Light mode"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-lg transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)] ${className}`}
    >
      <span aria-hidden className="transition-transform duration-300">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}