"use client";

import { useState } from "react";
import Link from "next/link";
import type { CommunityReport, ReportStatus } from "@/lib/community-store";

type Props = {
  reports: CommunityReport[];
};

const actions: { label: string; value: ReportStatus }[] = [
  { label: "Hide target", value: "hidden" },
  { label: "Delete target", value: "deleted" },
  { label: "Dismiss", value: "dismissed" }
];

export function AdminReportsPanel({ reports }: Props) {
  const [items, setItems] = useState(reports);
  const [busyId, setBusyId] = useState("");
  const pendingCount = items.filter((report) => report.status === "pending").length;

  async function moderate(reportId: string, action: ReportStatus) {
    setBusyId(reportId);
    const response = await fetch("/api/admin/community-reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, action })
    });

    setBusyId("");
    if (!response.ok) {
      window.alert("The report could not be updated.");
      return;
    }

    const data = await response.json();
    setItems((current) => current.map((report) => report.id === reportId ? data.report : report));
  }

  return (
    <section className="rounded-xl border border-white/5 bg-card p-5">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">Community reports</h2>
          <p className="mt-1 text-sm text-white/50">{pendingCount} pending reports</p>
        </div>
        <Link href="/community" className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/65">Open community</Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg bg-white/[0.03] p-4 text-sm text-white/50">No community reports yet.</div>
        ) : items.slice(0, 8).map((report) => (
          <div key={report.id} className="rounded-lg bg-white/[0.03] p-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-bold">{report.targetType}{" - "}{report.status}</p>
                <p className="mt-1 text-xs text-white/45">{report.targetId}</p>
                <p className="mt-3 text-sm text-white/70">{report.reason}</p>
                <p className="mt-2 text-xs text-white/35">{new Date(report.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {actions.map((action) => (
                  <button
                    key={action.value}
                    type="button"
                    disabled={busyId === report.id || report.status !== "pending"}
                    onClick={() => moderate(report.id, action.value)}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/65 transition hover:border-cyan/40 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
