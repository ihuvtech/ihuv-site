import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            404
          </div>
          <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
          <p className="mt-3 text-slate-600">
            The page you’re looking for doesn’t exist yet.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Go Home
            </Link>
            <Link
              href="/u/rvalluri"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              View Demo Portfolio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}