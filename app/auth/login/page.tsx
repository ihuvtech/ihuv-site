import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage your IHUV portfolio.",
};

export default function LoginPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white" />
          <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-indigo-200/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
          <div className="mx-auto max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              Sign in · <span className="font-medium">UI only for now</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-600">
              Sign in to edit and publish your portfolio. (Backend coming later.)
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <label className="text-sm font-medium text-slate-900">Email</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="you@email.com"
              />

              <label className="mt-4 block text-sm font-medium text-slate-900">
                Password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="••••••••"
              />

              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                Sign in (Coming Soon)
              </button>

              <div className="mt-4 text-sm text-slate-600">
                New here?{" "}
                <Link className="font-medium text-slate-900 hover:underline" href="/auth/register">
                  Create an account
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                Tip: You can still create a resume without signing in on{" "}
                <Link className="font-medium text-slate-900 hover:underline" href="/resume">
                  /resume
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}