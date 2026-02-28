export default function About() {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">About IHUV</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          IHUV is a modern career platform for developers — starting with clean,
          shareable portfolios and expanding into job tracking and AI resume tools.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Mission</h2>
            <p className="mt-2 text-sm text-slate-600">
              Help developers present themselves professionally and move faster in
              their careers.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">What we’re building</h2>
            <p className="mt-2 text-sm text-slate-600">
              Portfolio hosting today. Job tracker and AI resume tailoring coming
              next.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Roadmap</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Portfolio editor (save real profile content)</li>
            <li>Job application tracker dashboard</li>
            <li>AI resume tailoring from job descriptions</li>
            <li>Custom domains and analytics</li>
          </ul>
        </div>
      </div>
    </main>
  );
}