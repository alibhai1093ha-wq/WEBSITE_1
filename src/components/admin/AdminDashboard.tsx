"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Inquiry } from "@/lib/supabase";

type Status = "new" | "in_progress" | "resolved";

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-[var(--brand-500)]/10 text-[var(--brand-500)]",
  in_progress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  resolved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  in_progress: "In progress",
  resolved: "Resolved",
};

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function preview(text: string, length = 140): string {
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

export default function AdminDashboard({
  initial,
  configured,
}: {
  initial: Inquiry[];
  configured: boolean;
}) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initial);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter)),
    [inquiries, filter],
  );

  const counts = useMemo(() => {
    const c = { all: inquiries.length, new: 0, in_progress: 0, resolved: 0 };
    for (const i of inquiries) c[i.status]++;
    return c;
  }, [inquiries]);

  async function setStatus(id: string, status: Status) {
    setUpdatingId(id);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status } : i)),
        );
      } else {
        setNotice(json.message ?? "Update failed.");
      }
    } catch {
      setNotice("Network error — update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function refresh() {
    setNotice(null);
    try {
      const res = await fetch(
        `/api/admin/inquiries${filter === "all" ? "" : `?status=${filter}`}`,
      );
      const json = await res.json();
      if (res.ok && json.ok) {
        setInquiries(json.inquiries ?? []);
        setNotice(`Loaded ${json.inquiries?.length ?? 0} inquiries.`);
      } else {
        setNotice(json.message ?? "Failed to refresh.");
      }
    } catch {
      setNotice("Network error — refresh failed.");
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inquiry Dashboard</h1>
          <p className="mt-1 text-sm muted">
            Contact-form submissions{configured ? "" : " — database not configured"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refresh}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors hover:border-red-500 hover:text-red-500"
          >
            Sign out
          </button>
        </div>
      </div>

      {notice && (
        <p role="status" className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm muted">
          {notice}
        </p>
      )}

      {!configured && (
        <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm">
          <p className="font-semibold">Database not configured</p>
          <p className="mt-1 muted">
            Set <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono-brand text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono-brand text-[11px]">SUPABASE_SERVICE_ROLE_KEY</code>, and run{" "}
            <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono-brand text-[11px]">supabase/schema.sql</code> to start persisting inquiries.
          </p>
        </div>
      )}

      {/* Status filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", "new", "in_progress", "resolved"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === key
                ? "bg-[var(--brand-600)] text-white shadow-lg shadow-[var(--ring)]"
                : "border border-[var(--border)] muted hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
            }`}
          >
            {key === "all" ? "All" : STATUS_LABELS[key]}
            <span className="ml-1.5 text-xs opacity-70">{counts[key]}</span>
          </button>
        ))}
      </div>

      {/* Industry list */}
      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
            <p className="text-sm font-semibold">No inquiries here yet</p>
            <p className="mt-1 text-sm muted">
              New submissions from the contact form will appear here.
            </p>
          </div>
        )}

        {filtered.map((inquiry) => (
          <article key={inquiry.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base font-semibold">{inquiry.name}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[inquiry.status]}`}
                  >
                    {STATUS_LABELS[inquiry.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm muted">
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="transition-colors hover:text-[var(--brand-500)]"
                  >
                    {inquiry.email}
                  </a>
                  {inquiry.phone ? <> · {inquiry.phone}</> : null} · {formatWhen(inquiry.created_at)}
                </p>
                <p className="mt-2.5 text-sm font-medium text-[var(--brand-500)]">
                  {inquiry.subject}
                </p>
                <p className="mt-1 text-sm leading-relaxed muted">
                  {preview(inquiry.message)}
                </p>
              </div>

              {/* Status controls */}
              <div className="flex shrink-0 gap-2">
                {(["new", "in_progress", "resolved"] as Status[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={updatingId === inquiry.id || inquiry.status === status}
                    onClick={() => setStatus(inquiry.id, status)}
                    title={`Mark as ${STATUS_LABELS[status]}`}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      inquiry.status === status
                        ? "border-[var(--brand-500)] text-[var(--brand-500)]"
                        : "border-[var(--border)] muted hover:border-[var(--brand-500)] hover:text-[var(--brand-500)]"
                    }`}
                  >
                    {STATUS_LABELS[status]}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}