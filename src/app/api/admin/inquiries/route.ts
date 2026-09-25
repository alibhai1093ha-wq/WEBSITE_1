import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { isDatabaseConfigured, listInquiries } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { ok: false, message: "Not authorized." },
      { status: 401 },
    );
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({
      ok: true,
      configured: false,
      inquiries: [],
    });
  }

  const status = new URL(request.url).searchParams.get("status");
  const options: { status?: "new" | "in_progress" | "resolved" } = {};
  if (status === "new" || status === "in_progress" || status === "resolved") {
    options.status = status;
  }

  try {
    const inquiries = await listInquiries(options);
    return NextResponse.json({ ok: true, configured: true, inquiries: inquiries ?? [] });
  } catch (err) {
    console.error("[admin/inquiries] list failed:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to load inquiries." },
      { status: 500 },
    );
  }
}