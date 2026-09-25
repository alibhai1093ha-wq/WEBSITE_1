"use client";

import { useState } from "react";
import { faqs } from "@/config/content";

export default function FAQ({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="card overflow-hidden">
            <h3>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold sm:text-base">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-[var(--brand-500)] transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed muted">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
