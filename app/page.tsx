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
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 via-white to-slate-50" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 to-slate-200 opacity-60 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 opacity-50 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-gradient-to-br from-sky-200 to-blue-200 opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-1.5 text-xs text-slate-700 backdrop-blur shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-medium">New</span>
            <span className="text-slate-400">•</span>
            Portfolio URLs like <span className="font-mono font-semibold text-indigo-600">/u/username</span>
          </div>

          {/* Main heading with stagger animation */}
          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              AI Powered
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Developer Portfolios
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Create a clean, recruiter-ready portfolio in minutes. Share it instantly and
            iterate fast with our AI-powered platform.
          </p>

          {/* CTA Buttons with hover effects */}
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/u/rvalluri"
              className="group relative rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View Demo</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
            >
              See Pricing
            </Link>
            <a
              href="#try"
              className="rounded-xl border border-transparent bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all duration-300"
            >
              Try it Free
            </a>
          </div>

          {/* Stats with hover animations */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { label: "Fast setup", value: "2–5 mins", icon: "⚡" },
              { label: "Shareable URL", value: "/u/username", icon: "🔗" },
              { label: "Modern UI", value: "SaaS style", icon: "✨" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="group rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <div className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.value}</div>
                <div className="mt-1 text-sm text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 hover:shadow-2xl transition-shadow duration-500">
          {/* Try a Portfolio */}
          <div id="try" className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                  Try a portfolio
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Enter any username to preview a portfolio template.{" "}
                  <span className="font-semibold text-indigo-600">rvalluri</span> shows a richer demo.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username (e.g., rvalluri)"
                  className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                />
                <button
                  onClick={() => {
                    const u = username.trim();
                    if (u) router.push(`/u/${encodeURIComponent(u)}`);
                  }}
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View
                </button>
              </div>

              {/* Demo profiles */}
              <div className="flex flex-wrap gap-2 text-sm">
                {["rvalluri", "test", "john", "sarah"].map((u) => (
                  <Link
                    key={u}
                    href={`/u/${u}`}
                    className="group rounded-full border-2 border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-mono">/u/{u}</span>
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
                  icon: "🎨",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Job Tracker",
                  desc: "Track applications, interviews, and follow-ups (soon).",
                  icon: "📊",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "AI Resume Tailor",
                  desc: "Paste a JD and generate a tailored resume (soon).",
                  icon: "🤖",
                  color: "from-orange-500 to-red-500"
                },
                {
                  title: "One link for everything",
                  desc: "Projects, skills, experience, and contact in one page.",
                  icon: "🔗",
                  color: "from-green-500 to-emerald-500"
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group relative rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                    <div className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {f.title}
                    </div>
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex flex-col justify-between gap-6 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 sm:flex-row sm:items-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
              <div className="text-lg font-bold text-slate-900">
                Want IHUV to save real profiles?
              </div>
              <div className="mt-2 text-base text-slate-600">
                Next step: accounts + portfolio editor + database (later).
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              See Pricing
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
