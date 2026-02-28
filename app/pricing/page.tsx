export default function Pricing() {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Start free. Upgrade later for advanced features. (Payments coming soon.)
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div className="text-sm font-semibold text-slate-900">Free</div>
            <div className="mt-2 text-3xl font-semibold">$0</div>
            <p className="mt-2 text-sm text-slate-600">
              Great for getting started with a clean portfolio.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>• 1 portfolio</li>
              <li>• Public profile URL (/u/username)</li>
              <li>• Basic template</li>
            </ul>

            <button
              className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
              type="button"
            >
              Coming Soon
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-2 ring-slate-900">
            <div className="text-sm font-semibold text-slate-900">Pro</div>
            <div className="mt-2 text-3xl font-semibold">$12/mo</div>
            <p className="mt-2 text-sm text-slate-600">
              For serious job seekers and creators.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>• Multiple portfolios</li>
              <li>• Portfolio editor (save real content)</li>
              <li>• Analytics (coming soon)</li>
              <li>• AI resume tailor (coming soon)</li>
            </ul>

            <button
              className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              type="button"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">What’s next?</h2>
          <p className="mt-2 text-sm text-slate-600">
            We’ll add accounts, portfolio editing, and payments after the UI is stable.
          </p>
        </div>
      </div>
    </main>
  );
}