"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { business } from "@/config/business";

type Message = { id: number; from: "assistant" | "user"; text: string };

const QUICK_REPLIES = [
  { id: "pricing", label: "💰 Pricing plans" },
  { id: "services", label: "🧩 What services?" },
  { id: "human", label: "👋 Talk to a human" },
  { id: "demo", label: "📅 Book a demo" },
];

const ANSWERS: Record<string, string> = {
  pricing:
    "Plans start free with Starter (3 workflows, 1,000 tasks/month). Growth is $29/user/month, and Scale is custom with SSO, audit logs, and a 99.99% SLA. Want the full breakdown? I can get someone to send it to you.",
  services:
    "We automate the busywork: workflow automation, integrations (200+ connectors), an AI copilot, live analytics, security & compliance, and scale infrastructure. Short version — if it involves copy-paste, we can probably run it.",
  demo:
    "Great choice! The fastest path is to leave your details via the contact form — a human will reach out within one business day.",
};

const IDLE_RESPONSE =
  "Great question! I can point you to pricing, our services, or a real human. Which of these would help most?";

let nextId = 1;

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting when opened for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: nextId++,
          from: "assistant",
          text: "Hi! 👋 I'm the Nexaro assistant. I can answer quick questions about pricing and services — or hand you off to a human who actually knows their stuff.",
        },
      ]);
      setUnread(false);
    }
  }, [open, messages.length]);

  // Keep the transcript scrolled to the latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function push(from: "assistant" | "user", text: string) {
    setMessages((prev) => [...prev, { id: nextId++, from, text }]);
  }

  function handleQuickReply(key: string) {
    if (key === "human") {
      push("user", "Talk to a human");
      push(
        "assistant",
        "Of course — the fastest options are WhatsApp or the contact form. Choose one below and we'll reply within one business day (median first response is under 15 minutes).",
      );
      return;
    }
    const label = QUICK_REPLIES.find((q) => q.id === key)?.label ?? key;
    push("user", label.replace(/^\S+\s/, ""));
    push("assistant", ANSWERS[key] ?? IDLE_RESPONSE);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    push("user", text);
    // No real backend here — the widget is a smart lead-capture layer
    // that routes to WhatsApp / contact. Bots get nothing to chew on.
    push("assistant", IDLE_RESPONSE);
    setInput("");
  }

  const whatsappAvailable =
    business.whatsapp && !business.whatsapp.startsWith("YOUR_");

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="live-chat-panel"
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--brand-600)] to-[var(--accent-500)] text-white shadow-xl shadow-[var(--ring)] transition-transform hover:scale-110"
      >
        <span aria-hidden className="text-2xl transition-transform duration-300">
          {open ? "✕" : "💬"}
        </span>
        {unread && !open && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-red-500"
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="live-chat-panel"
          role="dialog"
          aria-label="Nexaro live chat"
          className="fixed bottom-24 left-5 z-40 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl shadow-[var(--shadow-color)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[var(--border)] bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-5 py-4 text-white">
            <div className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20 font-bold">
              N
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--brand-600)] bg-emerald-400"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Nexaro Assistant</p>
              <p className="text-xs text-white/80">Usually replies instantly</p>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="h-80 space-y-3 overflow-y-auto bg-[var(--surface-2)]/50 px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-[var(--brand-600)] text-white"
                      : "rounded-bl-md border border-[var(--border)] bg-[var(--surface)]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleQuickReply(q.id)}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hand-off actions */}
          <div className="flex gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3">
            {whatsappAvailable && (
              <a
                href={business.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-[#25D366] px-4 py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                WhatsApp
              </a>
            )}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-500)] px-4 py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact Form
            </Link>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--brand-500)]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--brand-600)] to-[var(--accent-500)] text-white transition-transform hover:scale-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}