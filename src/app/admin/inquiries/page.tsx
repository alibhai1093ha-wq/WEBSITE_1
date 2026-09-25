import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { isDatabaseConfigured, listInquiries, type Inquiry } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Inquiry Dashboard — Nexaro Tech",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  let inquiries: Inquiry[] = [];
  const configured = isDatabaseConfigured;
  if (configured) {
    try {
      inquiries = (await listInquiries()) ?? [];
    } catch (err) {
      console.error("[admin] failed to load inquiries:", err);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Slim admin bar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-2)]/60">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-mono-brand text-xs muted">
            <span aria-hidden>🛠️</span> Nexaro Admin
          </div>
          <div className="flex items-center gap-4 text-xs muted">
            <Link href="/" className="transition-colors hover:text-[var(--brand-500)]">
              View site →
            </Link>
          </div>
        </div>
      </div>

      <AdminDashboard initial={inquiries} configured={configured} />
    </main>
  );
}