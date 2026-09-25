/**
 * ============================================================
 *  ADMIN SESSION AUTH (server-only)
 * ============================================================
 *  Lightweight HMAC-signed session cookie for the inquiry
 *  dashboard. Not a full auth system — good enough to keep a
 *  public marketing site's internal dashboard from being open
 *  to the world.
 *
 *  Env vars:
 *    ADMIN_PASS            — password for /admin/login
 *    ADMIN_SESSION_SECRET  — optional; defaults to a stable
 *                            HMAC derived from ADMIN_PASS
 * ============================================================
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  return createHmac("sha256", "nexaro-admin-session-v1")
    .update(process.env.ADMIN_PASS ?? "")
    .digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** Creates a signed session token (payload = expiry JSON). */
export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verifies a token's signature and expiry in constant time. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

/** Constant-time password check. Unset/placeholder = always false. */
export function passwordMatches(input: string): boolean {
  const pass = process.env.ADMIN_PASS;
  if (!pass || pass.startsWith("YOUR_")) return false;
  const a = Buffer.from(input ?? "");
  const b = Buffer.from(pass);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export { COOKIE_NAME };