"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("rvalluri");
  const router = useRouter();

  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            New · Portfolio URLs: <span className="font-medium">/u/username</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight">
            AI Powered Developer Portfolios
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Build a professional developer portfolio in minutes. Share it instantly with recruiters.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/u/rvalluri"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              View Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Pricing
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-sm font-medium text-slate-900">Try a Portfolio</div>
            <div className="mt-3 flex gap-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g., rvalluri)"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button
                onClick={() => {
                  const u = username.trim();
                  if (u) router.push(`/u/${encodeURIComponent(u)}`);
                }}
                className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                View
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { title: "Portfolio Hosting", desc: "Clean pages under your username." },
              { title: "Job Tracker", desc: "Track applications & interviews (soon)." },
              { title: "AI Resume Tailor", desc: "Tailor resume to job descriptions (soon)." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="text-sm font-semibold">{f.title}</div>
                <div className="mt-2 text-sm text-slate-600">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}