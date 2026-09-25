"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/config/content";
import { business } from "@/config/business";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Contact info bar — business details visible on every page */}
      <div className="hidden border-b border-[var(--border)] bg-[var(--brand-600)] text-white md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs sm:px-6">
          <div className="flex items-center gap-5">
            <a
              href={business.mailto}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span aria-hidden>✉️</span>
              {business.email}
            </a>
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span aria-hidden>📞</span>
              {business.phone}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {business.hours[0] && (
              <span className="text-white/80">🕒 {business.hours[0].days}: {business.hours[0].time}</span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Nexaro Tech home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] text-sm font-bold text-white shadow-lg shadow-[var(--ring)]">
              N
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Nexaro<span className="text-[var(--brand-500)]"> Tech</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium muted transition-colors hover:text-[var(--brand-500)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--ring)] transition-transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
            open ? "max-h-[calc(100vh-4rem)] border-t opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--surface-2)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3 border-t border-[var(--border)] px-4 py-4">
            {/* Business contact details in mobile menu */}
            <a
              href={business.mailto}
              className="flex items-center gap-2 text-sm muted"
            >
              <span aria-hidden>✉️</span>
              {business.email}
            </a>
            <a href={business.tel} className="flex items-center gap-2 text-sm muted">
              <span aria-hidden>📞</span>
              {business.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
