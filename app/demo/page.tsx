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
  },
  {
    username: "test",
    name: "Test User",
    title: "Developer",
    note: "Generic template demo",
  },
  {
    username: "john",
    name: "John Doe",
    title: "Full-Stack Developer",
    note: "Generic template demo",
  },
  {
    username: "sarah",
    name: "Sarah Kim",
    title: "Frontend Engineer",
    note: "Generic template demo",
  },
];

export default function DemoPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Demo · <span className="font-medium">Portfolio templates</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Demo portfolios
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Click any demo profile to preview the portfolio UI under <span className="font-mono">/u/username</span>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Back Home
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((d) => (
              <Link
                key={d.username}
                href={`/u/${d.username}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {d.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{d.title}</div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    /u/{d.username}
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-600">
                  {d.note}
                </div>

                <div className="mt-5 text-sm font-medium text-slate-900">
                  View demo <span className="ml-1 group-hover:translate-x-0.5 inline-block transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            Tip: try any username at{" "}
            <Link href="/" className="font-medium text-slate-900 hover:underline">
              home
            </Link>{" "}
            to preview the generic template.
          </div>
        </div>
      </section>
    </main>
  );
}