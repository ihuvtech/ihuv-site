import Link from "next/link";

export default function Pricing() {
  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute left-[-140px] top-[220px] h-[340px] w-[340px] rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Simple plans · <span className="font-medium">Payments coming soon</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Pricing
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Start free. Upgrade later for editing, analytics, and AI tools.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/u/rvalluri"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              View Demo
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Free</div>
              <div className="mt-2 text-3xl font-semibold">$0</div>
              <p className="mt-2 text-sm text-slate-600">
                Great for a clean portfolio and sharing your link.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li>• 1 portfolio</li>
                <li>• Public URL (/u/username)</li>
                <li>• Premium template UI</li>
              </ul>

              <button
                type="button"
                className="mt-7 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Coming Soon
              </button>
            </div>

            {/* Pro */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="absolute -top-3 right-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                Recommended
              </div>

              <div className="text-sm font-semibold text-slate-900">Pro</div>
              <div className="mt-2 text-3xl font-semibold">$12/mo</div>
              <p className="mt-2 text-sm text-slate-600">
                For job seekers who want editing, analytics, and AI tools.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li>• Multiple portfolios</li>
                <li>• Portfolio editor (save real content)</li>
                <li>• Analytics (coming soon)</li>
                <li>• AI resume tailor (coming soon)</li>
              </ul>

              <button
                type="button"
                className="mt-7 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-sm font-semibold text-slate-900">Feature comparison</h2>

            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              {[
                ["Portfolio page", "Free + Pro"],
                ["Custom sections", "Pro (soon)"],
                ["Analytics", "Pro (soon)"],
                ["AI resume tailor", "Pro (soon)"],
              ].map(([left, right]) => (
                <div
                  key={left}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="text-slate-700">{left}</span>
                  <span className="text-slate-500">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}