import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about IHUV Technologies and our roadmap.",
};

export default function About() {
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 via-white to-slate-50" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 to-slate-200 opacity-60 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 opacity-50 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-gradient-to-br from-sky-200 to-blue-200 opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-1.5 text-xs text-slate-700 backdrop-blur shadow-sm animate-fade-in">
            <span className="font-medium">About</span>
            <span className="text-slate-400">•</span>
            <span>IHUV Technologies</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Building a modern career toolkit for developers
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            IHUV starts with premium portfolio pages and expands into job tracking and AI resume tools.
          </p>

          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/"
              className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105 inline-block"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 hover:shadow-2xl transition-shadow duration-500">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Mission</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Help developers present themselves professionally and move faster in their careers.
              </p>
            </div>

            <div className="group rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">What we're building</h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Portfolios today. Job tracking + AI resume tailoring next.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🗺️</div>
              <h2 className="text-lg font-bold text-slate-900">Roadmap</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Portfolio editor (save real content)",
                "Accounts + authentication",
                "Job application tracker dashboard",
                "AI resume tailor from job descriptions",
                "Custom domains + analytics",
                "Templates + themes",
              ].map((item, i) => (
                <div
                  key={item}
                  className="group rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
