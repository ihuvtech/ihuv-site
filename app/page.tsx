"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("rvalluri");
  const router = useRouter();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            <span className="font-medium">New</span>
            <span className="text-slate-400">•</span>
            Portfolio URLs like <span className="font-mono">/u/username</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            AI Powered Developer Portfolios
          </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Create a clean, recruiter-ready portfolio in minutes. Share it instantly and
            iterate fast.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/u/rvalluri"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              View Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Pricing
            </Link>
            <a
              href="#try"
              className="rounded-xl border border-transparent bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-white"
            >
              Try it
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Fast setup", value: "2–5 mins" },
              { label: "Shareable URL", value: "/u/username" },
              { label: "Modern UI", value: "SaaS style" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur"
              >
                <div className="text-sm font-semibold text-slate-900">{s.value}</div>
                <div className="mt-1 text-xs text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          {/* Try a Portfolio */}
          <div id="try" className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Try a portfolio
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter any username to preview a portfolio template.{" "}
                <span className="font-medium">rvalluri</span> shows a richer demo.
              </p>

              <div className="mt-5 flex gap-3">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username (e.g., rvalluri)"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  onClick={() => {
                    const u = username.trim();
                    if (u) router.push(`/u/${encodeURIComponent(u)}`);
                  }}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  View
                </button>
              </div>

              {/* Demo profiles */}
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {["rvalluri", "test", "john", "sarah"].map((u) => (
                  <Link
                    key={u}
                    href={`/u/${u}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-white"
                  >
                    /u/{u}
                  </Link>
                ))}
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Portfolio Hosting",
                  desc: "Clean pages under your username with a modern layout.",
                },
                {
                  title: "Job Tracker",
                  desc: "Track applications, interviews, and follow-ups (soon).",
                },
                {
                  title: "AI Resume Tailor",
                  desc: "Paste a JD and generate a tailored resume (soon).",
                },
                {
                  title: "One link for everything",
                  desc: "Projects, skills, experience, and contact in one page.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {f.title}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Want IHUV to save real profiles?
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Next step: accounts + portfolio editor + database (later).
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}