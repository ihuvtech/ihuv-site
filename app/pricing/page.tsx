import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "IHUV pricing plans: Free and Pro (coming soon).",
};

export default function Pricing() {
  return (
    <main>
      {/* Header */}
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
            <span className="font-medium">Simple plans</span>
            <span className="text-slate-400">•</span>
            <span>Payments coming soon</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Start free. Upgrade later for editing, analytics, and AI tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/u/rvalluri"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View Demo
            </Link>
            <Link
              href="/"
              className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 hover:shadow-2xl transition-shadow duration-500">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="group rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🆓</div>
              <div className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Free</div>
              <div className="mt-2 text-4xl font-bold text-slate-900">$0</div>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Great for a clean portfolio and sharing your link.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 1 portfolio
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Public URL (/u/username)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Premium template UI
                </li>
              </ul>

              <button
                type="button"
                className="mt-8 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 hover:border-indigo-300 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                Coming Soon
              </button>
            </div>

            {/* Pro */}
            <div className="group relative rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                Recommended
              </div>

              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <div className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Pro</div>
              <div className="mt-2 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">$12/mo</div>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                For job seekers who want editing, analytics, and AI tools.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Multiple portfolios
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Portfolio editor (save real content)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> Analytics (coming soon)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span> AI resume tailor (coming soon)
                </li>
              </ul>

              <button
                type="button"
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-slate-50 to-indigo-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">📊</div>
              <h2 className="text-lg font-bold text-slate-900">Feature comparison</h2>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-2">
              {[
                ["Portfolio page", "Free + Pro"],
                ["Custom sections", "Pro (soon)"],
                ["Analytics", "Pro (soon)"],
                ["AI resume tailor", "Pro (soon)"],
              ].map(([left, right]) => (
                <div
                  key={left}
                  className="group flex items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span className="text-slate-700 font-medium">{left}</span>
                  <span className="text-slate-500 group-hover:text-indigo-600 transition-colors">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
