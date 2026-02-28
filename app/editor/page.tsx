import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio Editor",
  description: "Edit and publish your IHUV portfolio (UI only).",
};

export default function EditorPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            Editor · <span className="font-medium">Signup required (later)</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            Portfolio Editor
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            This is the UI for editing your portfolio. Saving/publishing will be enabled after backend + auth.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Create account
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Sign in
            </Link>
            <Link
              href="/demo"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
            >
              See demo portfolios
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: form */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">Profile</h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Full name" />
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Headline (e.g., Frontend Engineer)" />
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Location" />
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Email" />
                </div>

                <textarea
                  className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="About (2–4 sentences)"
                  rows={4}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">Projects</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Add projects (saving comes later).
                </p>

                <div className="mt-4 space-y-3">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Project name" />
                  <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Project description" rows={3} />
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Tags (comma separated)" />
                </div>

                <button
                  type="button"
                  className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  + Add another project (UI only)
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-2xl bg-slate-900/50 px-5 py-3 text-sm font-medium text-white shadow-sm cursor-not-allowed"
                >
                  Publish (Coming Soon)
                </button>
                <Link
                  href="/u/rvalluri"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Preview demo
                </Link>
              </div>
            </div>

            {/* Right: preview */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-semibold text-slate-900">Live preview (mock)</h2>
              <p className="mt-1 text-sm text-slate-600">
                This preview will become real once we connect backend + auth.
              </p>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-semibold">
                    U
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Your Name</div>
                    <div className="text-sm text-slate-600">Your headline</div>
                    <div className="text-xs text-slate-500">Location</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-900">About</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Short about text will show here.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-900">Projects</div>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">Project Name</div>
                      <div className="mt-1 text-sm text-slate-600">Project description…</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-slate-500">
                  Tip: Use <span className="font-medium text-slate-900">/resume</span> to generate a resume without signup.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}