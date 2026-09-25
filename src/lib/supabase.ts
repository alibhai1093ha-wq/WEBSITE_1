/**
 * ============================================================
 *  DATABASE SERVICE LAYER (Supabase-ready)
 * ============================================================
 *  Clean CRUD boundary for future Supabase integration.
 *
 *  Today: if NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
 *  are not set, `isDatabaseConfigured` is false and every call
 *  returns null — the UI stays fully functional.
 *
 *  Later: `npm i @supabase/supabase-js`, fill in env vars,
 *  run supabase/schema.sql, and everything works with no
 *  other code changes.
 *
 *  SECURITY: the service-role key is server-only (no NEXT_PUBLIC_
 *  prefix, never imported into client components). The anon key
 *  is optional and safe for the browser when RLS is enabled.
 * ============================================================
 */

import { ContactInput } from "./validation";

// ---- Table schema reference (matches supabase/schema.sql) ----

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  created_at: string;
}

// ---- Configuration ----

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Optional anon key for future browser features (safe: RLS-gated).
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDatabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY,
);

/**
 * Lazily import the Supabase client so the app never crashes
 * when the package isn't installed yet.
 */
async function getServerClient() {
  if (!isDatabaseConfigured) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    // @supabase/supabase-js not installed yet — run `npm i @supabase/supabase-js`
    return null;
  }
}

// ---- Inquiries CRUD ----

export async function createInquiry(
  input: ContactInput & { status?: Inquiry["status"] },
): Promise<Inquiry | null> {
  const supabase = await getServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      subject: input.subject,
      message: input.message,
      status: input.status ?? "new",
    })
    .select()
    .single();

  if (error) throw new Error(`Database insert failed: ${error.message}`);
  return data as Inquiry;
}

export async function listInquiries(options?: {
  status?: Inquiry["status"];
  limit?: number;
}): Promise<Inquiry[] | null> {
  const supabase = await getServerClient();
  if (!supabase) return null;

  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw new Error(`Database query failed: ${error.message}`);
  return (data ?? []) as Inquiry[];
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry["status"],
): Promise<Inquiry | null> {
  const supabase = await getServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Database update failed: ${error.message}`);
  return data as Inquiry;
}
