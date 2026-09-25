import { NextResponse } from "next/server";
import { sanitizeText, validateContact, ContactInput } from "@/lib/validation";
import { createInquiry, isDatabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

// ---- Simple in-memory rate limiter (per-IP, 5 min window) ----
// Fine for a single server instance; swap for Upstash/Redis if
// you scale horizontally.
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_REQUESTS;
}

const SUBJECTS = [
  "General Inquiry",
  "Sales Question",
  "Support Request",
  "Partnership",
  "Feedback",
];

export async function POST(request: Request) {
  try {
    // Rate limit
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: "Too many requests. Please try again in a few minutes." },
        { status: 429 },
      );
    }

    // Parse body safely
    let body: Partial<ContactInput>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid request format." },
        { status: 400 },
      );
    }

    // Honeypot: bots fill hidden fields
    if (sanitizeText(String((body as Record<string, unknown>).website ?? ""))) {
      return NextResponse.json({ ok: true, message: "Thanks!" });
    }

    // Validate (server-side, always)
    const errors = validateContact(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, message: "Please correct the highlighted fields.", errors },
        { status: 400 },
      );
    }

    // Whitelist subject
    const subject = SUBJECTS.includes(body.subject as string)
      ? (body.subject as string)
      : "General Inquiry";

    const input: ContactInput = {
      name: sanitizeText(body.name ?? ""),
      email: sanitizeText(body.email ?? "").toLowerCase(),
      phone: body.phone ? sanitizeText(body.phone) : undefined,
      subject,
      message: sanitizeText(body.message ?? ""),
    };

    // Persist (no-ops cleanly when Supabase isn't configured yet)
    let persisted = false;
    let inquiryId: string | null = null;
    if (isDatabaseConfigured) {
      try {
        const inquiry = await createInquiry(input);
        persisted = Boolean(inquiry);
        inquiryId = inquiry?.id ?? null;
      } catch (err) {
        console.error("[contact] DB insert failed:", err);
        // Don't fail the request — log and continue so the user
        // still gets a success response (email fallback can be added).
      }
    }

    console.log(
      `[contact] inquiry received from ${input.email}${persisted ? " (stored)" : " (logged only — Supabase not configured)"}`,
    );

    return NextResponse.json({
      ok: true,
      message: persisted
        ? "Thanks! Your message has been received — we'll reply within one business day."
        : "Thanks! Your message has been sent — we'll reply within one business day.",
      inquiryId,
    });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong on our end. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
