"use client";

import { useState, type FormEvent } from "react";
import { validateContact, sanitizeText, type ContactInput, type FieldErrors } from "@/lib/validation";

const SUBJECTS = [
  "General Inquiry",
  "Sales Question",
  "Support Request",
  "Partnership",
  "Feedback",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently accept so bots think they succeeded
    if (String(data.get("website") ?? "").trim()) {
      setStatus("success");
      setFeedback({ type: "success", message: "Thanks! Your message has been sent." });
      return;
    }

    const input: ContactInput = {
      name: sanitizeText(String(data.get("name") ?? "")),
      email: sanitizeText(String(data.get("email") ?? "")),
      phone: sanitizeText(String(data.get("phone") ?? "")),
      subject: String(data.get("subject") ?? ""),
      message: sanitizeText(String(data.get("message") ?? "")),
    };

    // Client-side validation (UX only — the server re-validates)
    const clientErrors = validateContact(input);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setFeedback({ type: "error", message: "Please fix the errors below and try again." });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        setFeedback({ type: "success", message: json.message });
        form.reset();
      } else {
        setStatus("error");
        if (json.errors) setErrors(json.errors);
        setFeedback({
          type: "error",
          message: json.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus("error");
      setFeedback({
        type: "error",
        message: "Network error — please check your connection and try again.",
      });
    }
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--brand-500)] focus:ring-2 focus:ring-[var(--ring)] ${
      errors[field] ? "border-red-500" : "border-[var(--border)]"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {feedback && (
        <div
          role="alert"
          aria-live="polite"
          className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span aria-hidden>{feedback.type === "success" ? "✓" : "⚠"}</span>
          <div className="flex-1">
            <p className="font-semibold">
              {feedback.type === "success" ? "Message sent" : "Something needs fixing"}
            </p>
            <p className="mt-0.5">{feedback.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            aria-label="Dismiss message"
            className="text-lg leading-none opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone <span className="muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 123-4567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
            Subject <span aria-hidden className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={inputClass("subject")}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            Message <span aria-hidden className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you'd like to automate or ask us anything…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass("message")} resize-y`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--ring)] transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="mt-4 text-xs muted">
        We typically reply within one business day. Your details are never shared.
      </p>
    </form>
  );
}
