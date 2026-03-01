import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo",
  description: "Explore IHUV demo portfolios.",
};

const demos = [
  {
    username: "rvalluri",
    name: "Ravichandra Valluri",
    title: "Software Engineer · Cloud & Platform",
    note: "Richer profile demo",
    icon: "🌟",
  },
  {
    username: "test",
    name: "Test User",
    title: "Developer",
    note: "Generic template demo",
    icon: "👤",
  },
  {
    username: "john",
    name: "John Doe",
    title: "Full-Stack Developer",
    note: "Generic template demo",
    icon: "💻",
  },
  {
    username: "sarah",
    name: "Sarah Kim",
    title: "Frontend Engineer",
    note: "Generic template demo",
    icon: "🎨",
  },
];

export default function DemoPage() {
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
            <span className="font-medium">Demo</span>
            <span className="text-slate-400">•</span>
            <span>Portfolio templates</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Demo portfolios
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Click any demo profile to preview the portfolio UI under <span className="font-mono text-indigo-600">/u/username</span>.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/"
              className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
            >
              Back Home
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12 hover:shadow-2xl transition-shadow duration-500">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((d, i) => (
              <Link
                key={d.username}
                href={`/u/${d.username}`}
                className="group rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{d.icon}</div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    /u/{d.username}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {d.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{d.title}</div>
                </div>

                <div className="mt-4 text-sm text-slate-500">
                  {d.note}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <span>View demo</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-sm text-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <span className="font-semibold text-slate-900">Tip:</span> Try any username at{" "}
                <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                  home
                </Link>{" "}
                to preview the generic template.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
