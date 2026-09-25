import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — Nexaro Tech",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-16">
      <div className="glow left-1/2 top-[-6rem] h-64 w-[28rem] -translate-x-1/2 bg-[var(--brand-500)]/20" />
      <div className="relative w-full max-w-sm">
        <div className="card p-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--accent-500)] text-lg font-bold text-white shadow-lg shadow-[var(--ring)]">
            N
          </span>
          <h1 className="mt-5 text-center text-2xl font-bold tracking-tight">
            Admin sign in
          </h1>
          <p className="mt-2 text-center text-sm muted">
            Restricted area — inquiry dashboard credentials required.
          </p>

          <div className="mt-6">
            <AdminLoginForm />
          </div>

          <p className="mt-6 text-center text-xs muted">
            Need access? Configure{" "}
            <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono-brand text-[11px]">
              ADMIN_PASS
            </code>{" "}
            in your environment.
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm muted transition-colors hover:text-[var(--brand-500)]">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}