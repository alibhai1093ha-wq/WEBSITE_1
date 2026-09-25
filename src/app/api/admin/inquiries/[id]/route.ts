import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { isDatabaseConfigured, updateInquiryStatus } from "@/lib/supabase";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "in_progress", "resolved"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { ok: false, message: "Not authorized." },
      { status: 401 },
    );
  }

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request format." },
      { status: 400 },
    );
  }

  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json(
      { ok: false, message: "Invalid status." },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json(
      { ok: false, message: "Database not configured." },
      { status: 200 },
    );
  }

  try {
    const inquiry = await updateInquiryStatus(
      params.id,
      body.status as "new" | "in_progress" | "resolved",
    );
    return NextResponse.json({ ok: true, inquiry });
  } catch (err) {
    console.error("[admin/inquiries] update failed:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to update inquiry." },
      { status: 500 },
    );
  }
}